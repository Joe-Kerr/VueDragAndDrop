// jsdom injected via vue cli

const assert = require("assert");
const sinon = require("sinon");
const Sample = require("../../src/DragAndDrop.js").default;
const PubSub = require("../../src/PubSub.js").default;

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
	const cbs = options.callbacks || callbacks();	
	const el = defaultElement(id);
	const data = options.data || {};
	
	document.body.appendChild(el);
	
	//const cfg = config();	
	const cfg = Object.assign(config(), options);	
	
	cfg.mode = type;
	cfg.type = options.type || (type === "draggable") ? "drag" : "drop";
	sample.addEventListener(el, el, cfg, data, cbs);		
	
	return el;
}

function callbacks() {
	return new PubSub();
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


test("all adhoc event listeners cleaned up", async ()=>{
	sample._mousedown(defaultElement(), defaultEvent(), config(), {}, callbacks());

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
	sample.addEventListener(drag, drag, c, {}, callbacks());
	c.mode = "droppable";	
	sample.addEventListener(drop, drop, c, {}, callbacks());	
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
	
	sample._mousedown(defaultElement(), defaultEvent(), config(), {}, callbacks());
	
	trigger("mouseup");	
	
	assert.ok( droppable1.calledBefore(sample._evaluateDroppableWatcher) );
	assert.ok( droppable2.calledBefore(sample._evaluateDroppableWatcher) );
	
	global.document.removeEventListener("mouseup", droppable1);
	global.document.removeEventListener("mouseup", droppable2);	
});

test("call to removeEventListener mid dragging prevents droppable mouseup callbacks", async ()=>{
	const called = [];
	const callbackTest = (e,d)=>{called.push(e);}
	const cbs = callbacks();
	
	const dragstart = cbs.getEvent("dragstart");
	const dragstop = cbs.getEvent("dragstopOnDroppable");
	const dragstopAlways = cbs.getEvent("dragstopAlways");
	
	cbs.subscribe(dragstart, callbackTest);
	cbs.subscribe(dragstop, callbackTest);
	cbs.subscribe(dragstopAlways, callbackTest);
	
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	const droppable1 = addElWithListener(sample, "droppable", {callbacks: cbs});	
		
	await trigger("mousedown", draggable1);	
	
	sample.removeEventListener("draggable", draggable1);

	await trigger("mouseup", droppable1);		
	
	assert.deepEqual(called.sort(), [dragstart, dragstopAlways]);
	
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);	
});

test("if dragging aborted by removeEventListener, dragstop callback gets proper data parameters", async ()=>{
	let params = null;
	const callbackTest = (e,d)=>{params=Object.assign({},d);}
	const cbs = callbacks();	
	const dragstopAlways = cbs.getEvent("dragstopAlways");
	
	cbs.subscribe(dragstopAlways, callbackTest);
	
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	const droppable1 = addElWithListener(sample, "droppable", {callbacks: cbs, data: "unitTest"});	
		
	await trigger("mousedown", draggable1);	
	
	sample.removeEventListener("draggable", draggable1);

	await trigger("mouseup", droppable1);		
	
	assert.notStrictEqual(params.endX, null);
	assert.notStrictEqual(params.endY, null);	
	assert.notStrictEqual(params.droppableX, null);
	assert.notStrictEqual(params.droppableY, null);
	assert.notStrictEqual(params.droppableEl, null);	
	assert.strictEqual(params.droppableType, null);
	
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);		
});

//jsdom does not provide pageX/Y
test("all private callbacks fire with expected parameter properties", async ()=>{
	const dndParameters = [
		"startX",
		"startY",
		"endX",
		"endY",
		"curX",
		"curY",
		"deltaX",
		"deltaY",

		"draggableEl",
		"draggableX",
		"draggableY",
		"draggableNewX",
		"draggableNewY",
		"draggableType",
		"draggableData",
		"draggableList",

		"droppableEl",
		"droppableX",
		"droppableY",	
		"droppableType",		
		"droppableData",
		
		"eventTarget"
	];	
	
	function assertAllParamsPresent(allParams, cbParams) {
		allParams.forEach((param)=>{
			for(const event in cbParams) {
				const cbParamsOfEvent = cbParams[event];

				assert.ok(param in cbParamsOfEvent, "Expected parameter '"+param+"' to be provided to event '"+event+"'.");
			}
		});
	}
	
	function assertNoUnknownParams(allParams, cbParams) {
			for(const event in cbParams) {
				const cbParamsOfEvent = cbParams[event];

				for(const singleEventParam in cbParamsOfEvent) {
					assert.ok(allParams.indexOf(singleEventParam) > -1, "Unknown parameter '"+singleEventParam+"' provided to event '"+event+"'.");
				}
			}		
	}
	
	let calls = 0;
	const callbackParams = {
		dragstart: null,
		dragmove: null,
		droppingOver: null,
		droppedAll: null,
		dragstop: null,
	};
	const fakeCallback = (e,p)=>{ calls++; callbackParams[e] = Object.assign({}, p); }
	const cbs = callbacks();
	
	for(const event in callbackParams) { cbs.subscribe(event, fakeCallback); }
	
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	const droppable1 = addElWithListener(sample, "droppable", {callbacks: cbs});	
	
	await trigger("mousedown", draggable1);	
	await trigger("mousemove");	
	await trigger("mouseup", droppable1);		
	
	assert.equal(Object.keys(callbackParams).length, calls);
	
	assertAllParamsPresent(dndParameters, callbackParams);
	assertNoUnknownParams(dndParameters, callbackParams);
	//console.log(callbackParams)
	
	sample.removeEventListener("draggable", draggable1);
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);		
});

test("optional custom dragstart callback fires", async ()=>{
	const dragstart = new sinon.fake();	
	const cbs = callbacks();
	cbs.subscribe(cbs.getEvent("dragstart"), dragstart);	
	
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	
	await trigger("mousedown", draggable1);		
	await trigger("mouseup");	

	assert.equal(dragstart.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	document.body.removeChild(draggable1);
});

test("optional custom drag callback fires", async ()=>{
	const drag = new sinon.fake();
	const cbs = callbacks();
	cbs.subscribe(cbs.getEvent("dragmove"), drag);		
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	
	await trigger("mousedown", draggable1);		
	await trigger("mousemove");	
	await trigger("mouseup");	

	assert.equal(drag.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	document.body.removeChild(draggable1);	
});

test("optional custom dragstop callbacks fire when not over droppable", async ()=>{
	const dragstopOn = new sinon.fake();
	const dragstopAfter = new sinon.fake();
	const dragstopAlways = new sinon.fake();
	const cbs = callbacks();
	cbs.subscribe(cbs.getEvent("dragstopOnDroppable"), dragstopOn);		
	cbs.subscribe(cbs.getEvent("dragstopAfterAllDroppables"), dragstopAfter);		
	cbs.subscribe(cbs.getEvent("dragstopAlways"), dragstopAlways);		
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	
	await trigger("mousedown", draggable1);		
	await trigger("mouseup");	

	assert.equal(dragstopOn.callCount, 0);
	assert.equal(dragstopAfter.callCount, 1);
	assert.equal(dragstopAlways.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	document.body.removeChild(draggable1);
});

test("optional custom dragstop callbacks fire when over droppable", async ()=>{
	const dragstopOn = new sinon.fake();
	const dragstopAfter = new sinon.fake();
	const dragstopAlways = new sinon.fake();
	const cbs = callbacks();
	cbs.subscribe(cbs.getEvent("dragstopOnDroppable"), dragstopOn);		
	cbs.subscribe(cbs.getEvent("dragstopAfterAllDroppables"), dragstopAfter);		
	cbs.subscribe(cbs.getEvent("dragstopAlways"), dragstopAlways);		
	const draggable1 = addElWithListener(sample, "draggable", {callbacks: cbs});
	const droppable1 = addElWithListener(sample, "droppable");	
	
	await trigger("mousedown", draggable1);		
	await trigger("mouseup", droppable1);	

	assert.equal(dragstopOn.callCount, 1);
	assert.equal(dragstopAfter.callCount, 1);
	assert.equal(dragstopAlways.callCount, 1);
	
	sample.removeEventListener("draggable", draggable1);
	sample.removeEventListener("droppable", droppable1);
	document.body.removeChild(draggable1);
	document.body.removeChild(droppable1);	
});

test("hotDND drag interops with droppable listeners", async ()=>{
	const droppable = addElWithListener(sample, "droppable", {type: "normalDrop"});
	const hotDraggable = defaultElement("hotDraggable");	
	const config = {mode: "draggable", type: "hotDrag"}
	const data = "interop";
	const event = {pageX: 1, pageY: 2};
	const cbs = callbacks();
	
	const dragstart = new sinon.fake();	
	const drag = new sinon.fake();	
	const dragstopOn = new sinon.fake();
	const dragstopAfter = new sinon.fake();
	const dragstopAlways = new sinon.fake();	
	
	cbs.subscribe(cbs.getEvent("dragstart"), dragstart);
	cbs.subscribe(cbs.getEvent("dragmove"), drag);		
	cbs.subscribe(cbs.getEvent("dragstopOnDroppable"), dragstopOn);		
	cbs.subscribe(cbs.getEvent("dragstopAfterAllDroppables"), dragstopAfter);		
	cbs.subscribe(cbs.getEvent("dragstopAlways"), dragstopAlways);	
	
	sample.hotDND(hotDraggable, config, data, event, cbs);
	await trigger("mousemove");
	await trigger("mouseup", droppable);
	
	assert.equal(dragstart.callCount, 1);
	assert.equal(drag.callCount, 1);
	assert.equal(dragstopOn.callCount, 1);
	assert.equal(dragstopAfter.callCount, 1);
	assert.equal(dragstopAlways.callCount, 1);
	
	sample.removeEventListener("droppable", droppable);
	document.body.removeChild(droppable);		
});

test("hotDND drop interops with draggable listeners", async ()=>{
	const hotDroppable = defaultElement("hotDroppable");	
	const config = {mode: "droppable", type: "hotDrop"}
	const data = "interop";
	const event = {pageX: 1, pageY: 2};
	const cbs = callbacks();
	
	const dragstart = new sinon.fake();	
	const drag = new sinon.fake();	
	const dragstopOn = new sinon.fake();
	const dragstopAfter = new sinon.fake();
	const dragstopAlways = new sinon.fake();	
	
	cbs.subscribe(cbs.getEvent("dragstart"), dragstart);
	cbs.subscribe(cbs.getEvent("dragmove"), drag);		
	cbs.subscribe(cbs.getEvent("dragstopOnDroppable"), dragstopOn);		
	cbs.subscribe(cbs.getEvent("dragstopAfterAllDroppables"), dragstopAfter);		
	cbs.subscribe(cbs.getEvent("dragstopAlways"), dragstopAlways);	
	
	const draggable = addElWithListener(sample, "draggable", {type: "normalDrag", callbacks: cbs});
		
	await trigger("mousedown", draggable);		
	await trigger("mousemove");
	sample.hotDND(hotDroppable, config, data, event, null);
	await trigger("mouseup");
	
	assert.equal(dragstart.callCount, 1);
	assert.equal(drag.callCount, 1);
	assert.equal(dragstopOn.callCount, 1);
	assert.equal(dragstopAfter.callCount, 1);
	assert.equal(dragstopAlways.callCount, 1);
	
	sample.removeEventListener("draggable", draggable);
	document.body.removeChild(draggable);	
});