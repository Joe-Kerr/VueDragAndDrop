const assert = require("assert");
const testSuite = require("../../../../../../+test_common/webdriverSuite.js");

//to=test objects
let driver, to={};

suite("Dragging general");

async function scrollTo(x, y) {
	return driver.executeScript("window.scroll("+x+","+y+");");
}

before(async function() {	
	
	this.timeout(15000);
	
	//requires Apache
	await testSuite.open("http://localhost/OSS/vue_projects/projects/plugins/dragAndDrop/tests/system/dragAndDropParameters.html");
	driver = testSuite.driver;
});

beforeEach(async ()=>{
	const {By} = testSuite;
	const ps = [];
	const ids = [
		"draggable", "droppable",
		"dragstartParams", "dragParams", "dragstopParams", "storeParams",
		 "reset", "scale", "unscale"
	];
	
	ids.forEach((id)=>{
		ps.push(driver.findElement(By.id(id)));
	});
	
	const res = await Promise.all(ps);
	
	ids.forEach((id, index)=>{
		to[id] = res[index];
	});		
});

afterEach(async ()=>{
	const {By, Key, until} = testSuite;
	await to.reset.click();
	await driver.wait(until.titleIs("ready"), 1000);
	await driver.executeScript("window.scroll(0,0);");
});

async function dragAndDrop(queryEvent) {
	const draggable = to.draggable;
	
	const before = await draggable.getRect();
	const mx0 = before.x;
	const my0 = before.y;	
	const mxEnd = 400;
	const myEnd = 300;
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.release()
		.perform();	


	const parameters = JSON.parse(await to[queryEvent].getText());
	
	const after = await draggable.getRect();

	return {before, after, parameters, mx0, my0, mxEnd, myEnd};
}

class DefaultAsserts {
	constructor(mods, before, after, mx0, my0, mxEnd, myEnd) {
		this.tests = {
			startX: mx0,
			startY: my0,
			endX: null,
			endY: null,
			curX: mxEnd,
			curY: myEnd,
			deltaX: mxEnd - mx0,
			deltaY: myEnd - my0,
			
			draggableEl: {id: "draggable"},	
			draggableX: before.x,	
			draggableY: before.y,		
			draggableNewX: mxEnd,	
			draggableNewY: myEnd,			
			draggableData: 123,	
			draggableType: "drag",	
			draggableList: [{id: "draggable"}],	

			droppableEl: {},
			droppableX: null,
			droppableY: null,
			droppableType: null,
			droppableData: null			
		};
		
		this.modify(this.tests, mods, before, after, mx0, my0, mxEnd, myEnd);
	}
	
	assert(params) {
		for(const paramName in this.tests) {
			const expected = this.tests[paramName];
			const actual = params[paramName];
			
			if(typeof actual !== "object") {
				assert.strictEqual(actual, expected, "Error in "+paramName+". Expected '"+JSON.stringify(expected)+"' but got '"+JSON.stringify(actual)+"'");
			}
			else {
				assert.deepEqual(actual, expected, "Error in "+paramName+"Expected '"+expected+"' but got '"+actual+"'.");
			}
		}
	}	
	
	modify(tests, mods, before, after, mx0, my0, mxEnd, myEnd) {
		for(const param in mods) {
			tests[param] = mods[param]({before, after, mx0, my0, mxEnd, myEnd});
		}
	}	
}

test("drag and drop provides expected public dragstart parameters", async ()=>{
	const dnd = await dragAndDrop("dragstartParams");
	const dragstartParams = dnd.parameters;
	const {before, mx0, my0} = dnd;
	
	const modifiedAssertions = {
		curX: (params)=>(params.mx0),
		curY: (params)=>(params.my0),
		deltaX: (params)=>(0),
		deltaY: (params)=>(0),		
		
		draggableNewX: (params)=>(params.before.x),
		draggableNewY: (params)=>(params.before.y)		
	};
	new DefaultAsserts(modifiedAssertions, before, null, mx0, my0).assert(dragstartParams);
	
	assert.deepEqual(dragstartParams.eventTarget, {type: "mousedown", pageX: mx0, pageY: my0});
});

test("drag and drop provides expected public dragmove parameters", async ()=>{
	const dnd = await dragAndDrop("dragParams");
	const dragParams = dnd.parameters;
	const {before, after, mx0, my0, mxEnd, myEnd} = dnd;
	
	const modifiedAssertions = {};
	new DefaultAsserts(modifiedAssertions, before, after, mx0, my0, mxEnd, myEnd).assert(dragParams);
	
	assert.deepEqual(dragParams.eventTarget, {type: "mousemove", pageX: mxEnd, pageY: myEnd});
});

test("drag and drop provides expected public dragstop parameters", async ()=>{
	const dnd = await dragAndDrop("dragstopParams");	
	const droppableRect = await to.droppable.getRect();	
	const dragstopParams = dnd.parameters;
	const {before, after, mx0, my0, mxEnd, myEnd} = dnd;
	
	const modifiedAssertions = {
		endX: (params)=>(params.mxEnd),
		endY: (params)=>(params.myEnd),
		
		droppableEl: (params)=>({id: "droppable"}),
		droppableX: (params)=>(droppableRect.x),
		droppableY: (params)=>(droppableRect.y),
		droppableType: (params)=>("drop"),
		droppableData: (params)=>(456)			
	};
	new DefaultAsserts(modifiedAssertions, before, after, mx0, my0, mxEnd, myEnd).assert(dragstopParams);
		
	assert.deepEqual(dragstopParams.eventTarget, {type: "mouseup", pageX: mxEnd, pageY: myEnd});
});

test("drag and drop provides expected public store action parameters", async ()=>{
	const dnd = await dragAndDrop("storeParams");	
	const droppableRect = await to.droppable.getRect();	
	const storeParams = dnd.parameters;
	const {before, after, mx0, my0, mxEnd, myEnd} = dnd;
	
	const modifiedAssertions = {
		endX: (params)=>(params.mxEnd),
		endY: (params)=>(params.myEnd),
		
		droppableEl: (params)=>({id: "droppable"}),
		droppableX: (params)=>(droppableRect.x),
		droppableY: (params)=>(droppableRect.y),
		droppableType: (params)=>("drop"),		
		droppableData: (params)=>(456)		
	};
	new DefaultAsserts(modifiedAssertions, before, after, mx0, my0, mxEnd, myEnd).assert(storeParams);
		
	assert.deepEqual(storeParams.eventTarget, {type: "mouseup", pageX: mxEnd, pageY: myEnd});
});