// jsdom injected via vue cli

const assert = require("assert");
const sinon = require("sinon");
const Sample = require("../../src/DragAndDrop.js").default;

let sample;
const listeners = [];

const defaultElement = (id=null)=>{
	const el = global.document.createElement("div");
	if(id !== null) {el.id=id;}
	return el;
};

const defaultEvent = ()=>{return {
	pageX: 1,
	pageY: 2
}}

const config = ()=>{return {
	type: null,
	greedy: false,
	draggableOnly: false,
	dragstop: undefined,
	dragstart: undefined,
	delegate: null
}};

function wait(ms) {
	return new Promise((resolve)=>{
		setTimeout(()=>{resolve();}, ms);
	});
}

async function trigger(name, target=global.document) {
	target.dispatchEvent(new global.window.MouseEvent(name, {bubbles: true, cancelable: true, target}));
	await wait(150);
}

function addElWithListener(dnd, type, options={}) {
	dnd._verifyMode(type);
	const id = options.id || type;
	const callback = options.callback || function(){};	
	const el = defaultElement(id);
	
	document.body.appendChild(el);
	
	//const cfg = config();	
	const cfg = Object.assign(config(), options);	
	
	cfg.mode = type;
	cfg.type = options.type || (type === "draggable") ? "drag" : "drop";
	sample.addEventListener(el, el, cfg, {}, callback);		
	
	return el;
}


suite("dragAndDrop.js - Integration testing");

before(()=>{
	sinon.spy(global.document, "addEventListener");
	sinon.spy(global.document, "removeEventListener");
});

after(()=>{
	global.document.addEventListener.restore();
	global.document.removeEventListener.restore();		
	global.window.close();
});

beforeEach(()=>{
	sample = new Sample();
});

afterEach(()=>{
	const nAdd = global.document.addEventListener.callCount;
	const nRem = global.document.removeEventListener.callCount;
	assert.equal(nAdd, nRem, "Test setup error: event listeners not properly cleaned up. Added: "+nAdd+" | Removed: "+nRem);
	
	global.document.addEventListener.resetHistory();
	global.document.removeEventListener.resetHistory();	
});


test("clone setup and cleanup", async ()=>{
	const org = defaultElement();
	org.id = "test";
	
	sample._mousedown(org, defaultEvent(), config(), {}, ()=>{});	
	assert.notEqual(global.document.getElementById("cloneAnchor"), null);
	
	await trigger("mouseup");	

	assert.equal(global.document.getElementById("cloneAnchor"), null);
});

test("all adhoc event listeners cleaned up", async ()=>{
	sample._mousedown(defaultElement(), defaultEvent(), config(), {}, ()=>{});

	await trigger("mouseup");
	
	assert.equal(global.document.addEventListener.callCount, 2); //1x mousemove + 1x mouseup
	assert.equal(global.document.removeEventListener.callCount, 2); //1x mousemove + 1x mouseup
});

test("all delegate event listeners cleaned up", ()=>{
	const drop = defaultElement("drop");
	const drag = defaultElement("drag");
	const c = config();
	
	[drag, drop].forEach((el)=>{ 
		["addEventListener", "removeEventListener"].forEach((ev)=>{ sinon.spy(el, ev); }); 
		document.body.appendChild(el);
	});
		
	c.mode = "draggable";	
	sample.addEventListener(drag, drag, c, {}, ()=>{});
	c.mode = "droppable";	
	sample.addEventListener(drop, drop, c, {}, ()=>{});	
	sample.removeEventListener("draggable", drag);	
	sample.removeEventListener("droppable", drop);
	
	assert.equal(global.document.addEventListener.callCount, 0);
	assert.equal(drag.addEventListener.callCount, 1);
	assert.equal(drop.addEventListener.callCount, 1);	
	
	assert.equal(global.document.removeEventListener.callCount, 0);	
	assert.equal(drag.removeEventListener.callCount, 1);
	assert.equal(drop.removeEventListener.callCount, 1);
	
	document.body.removeChild(drag);
	document.body.removeChild(drop);
});

test("all droppable mouseup callbacks fire before evaluation function", async ()=>{	
	const droppable1 = new sinon.fake();
	const droppable2 = new sinon.fake();
	sinon.spy(sample, "_evaluateDroppableWatcher");	
	global.document.addEventListener("mouseup", droppable1);
	global.document.addEventListener("mouseup", droppable2);
	
	sample._mousedown(defaultElement(), defaultEvent(), config(), {}, ()=>{});
	
	trigger("mouseup");	
	
	assert.ok( droppable1.calledBefore(sample._evaluateDroppableWatcher) );
	assert.ok( droppable2.calledBefore(sample._evaluateDroppableWatcher) );
	
	global.document.removeEventListener("mouseup", droppable1);
	global.document.removeEventListener("mouseup", droppable2);	
});

test("call to removeEventListener mid dragging prevents droppable mouseup callbacks", async ()=>{
	const called = [];
	const callbackTest = (e,d)=>{called.push(e);}
	
	const draggable1 = addElWithListener(sample, "draggable", {callback: callbackTest});
	const droppable1 = addElWithListener(sample, "droppable", {callback: callbackTest});	
		
	await trigger("mousedown", draggable1);	
	
	sample.removeEventListener("draggable", draggable1);

	await trigger("mouseup", droppable1);		
	
	assert.deepEqual(called.sort(), ["mousedown", "mouseupAlways"]);
	
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);	
});


test("draggable callback receives all draggable parameters", async ()=>{	
	let params = {};
	const callbackTest = (e,p)=>{params=p;}

	//jsdom is not aware of layout
	const paramsNotNull = [
		"startX", "startY", "curX", "curY", 
		"draggableEl", "draggableX", "draggableY", "draggableNewX", "draggableNewY", "draggableType", "draggableData",
		"_cloneStartX", "_cloneStartY"
	];
	
	const draggable1 = addElWithListener(sample, "draggable", {callback: callbackTest});
	const droppable1 = addElWithListener(sample, "droppable", {callback: callbackTest});

	await trigger("mousedown", draggable1);	

	for(const param in params) {
		const val = params[param];
	
		if(paramsNotNull.indexOf(param) > -1) {
			assert.notStrictEqual(val, null, "Expected '"+param+"' in draggable callback parameters to be not null.");
		}
		else {
			assert.strictEqual(val, null, "Expected '"+param+"' in draggable callback parameters to be null.");
		}
	}
	
	paramsNotNull.forEach((param)=>{
		assert.ok(param in params, "Parameter "+param+" missing in draggable callback parameters.")
	});		
	
	await trigger("mouseup", droppable1);		
	sample.removeEventListener("draggable", draggable1);
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);		
});

test("droppable callback receives all parameters", async ()=>{	
	let params = {};
	const callbackTest = (e,p)=>{
		for(const param in p) {
			const val = p[param];
			
			if(val === null) {continue;}
			
			params[param] = val;
		}
	}

	//jsdom is not aware of layout
	const paramsNotNull = [
		"startX",
		"startY",
		"endX",
		"endY",
		"curX",
		"curY",

		"draggableEl",
		"draggableX",
		"draggableY",
		"draggableNewX",
		"draggableNewY",
		"draggableType",
		"draggableData",

		"droppableEl",
		"droppableX",
		"droppableY",	
		"droppableType",		
		"droppableData",

		"_cloneStartX", 
		"_cloneStartY"		
	];

	const draggable1 = addElWithListener(sample, "draggable", {callback: callbackTest});
	const droppable1 = addElWithListener(sample, "droppable", {callback: callbackTest});	
	
	await trigger("mousedown", draggable1);	
	
	await trigger("mouseup", droppable1);	
	
	for(const param in params) {
		const val = params[param];
		
		if(paramsNotNull.indexOf(param) > -1) {
			assert.notStrictEqual(val, null, "Expected '"+param+"' in droppable callback parameters to be not null.");
		}
		else {
			assert.strictEqual(val, null, "Expected '"+param+"' in droppable callback parameters to be null.");
		}				
	}
	
	paramsNotNull.forEach((param)=>{
		assert.ok(param in params, "Parameter "+param+" missing in droppable callback parameters.")
	});	
		
	sample.removeEventListener("draggable", draggable1);
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);			
});

test("optional custom dragstart callback fires", async ()=>{
	const dragstart = new sinon.fake();
	const draggable1 = addElWithListener(sample, "draggable", {dragstart});
	
	await trigger("mousedown", draggable1);		
	await trigger("mouseup");	

	assert.equal(dragstart.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	document.body.removeChild(draggable1);
});

test("optional custom dragstop callback fires when not over droppable", async ()=>{
	const dragstop = new sinon.fake();
	const draggable1 = addElWithListener(sample, "draggable", {dragstop});
	
	await trigger("mousedown", draggable1);		
	await trigger("mouseup");	

	assert.equal(dragstop.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	document.body.removeChild(draggable1);
});

test("optional custom dragstop callback fires when over droppable", async ()=>{
	const dragstop = new sinon.fake();
	const draggable1 = addElWithListener(sample, "draggable", {dragstop});
	const droppable1 = addElWithListener(sample, "droppable");	
	
	await trigger("mousedown", draggable1);		
	await trigger("mouseup", droppable1);	

	assert.equal(dragstop.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);	
});

test("optional custom drag callback fires", async ()=>{
	const drag = new sinon.fake();
	const draggable1 = addElWithListener(sample, "draggable", {drag});
	
	await trigger("mousedown", draggable1);		
	await trigger("mousemove");	
	await trigger("mouseup");	

	assert.equal(drag.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	document.body.removeChild(draggable1);	
});