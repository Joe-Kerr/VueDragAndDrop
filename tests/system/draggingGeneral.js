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
	await testSuite.open("http://localhost/OSS/vue_projects/projects/plugins/dragAndDrop/tests/system/draggingGeneral.html");
	driver = testSuite.driver;
});

beforeEach(async ()=>{
	const {By} = testSuite;
	const ps = [];
	const ids = [
		"draggableFree", "draggableFreeFixed", "draggableWithStyle",
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

async function draggableCanBeDragged(draggableType, scrolled, scaled) {
	const draggable = to[draggableType];
	
	if(scrolled) {
		await scrollTo(5, 8);		
	}
	
	if(scaled) {
		await to.scale.click();
	}
	else {
		await to.unscale.click();
	}
	
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
	
	const after = await draggable.getRect();

	assert.equal(after.x, mxEnd);
	assert.equal(after.y, myEnd);		
}

async function cloneRendersBeforeMouseMove(draggableType, scrolled, scaled) {
	const {By} = testSuite;

	const draggable = to[draggableType];
	
	if(scrolled) {
		await scrollTo(5, 8);		
	}
	
	if(scaled) {
		await to.scale.click();
	}
	else {
		await to.unscale.click();
	}	
	
	let elPos = await draggable.getRect();
	let clonePos;
	const mx0 = elPos.x;
	const my0 = elPos.y;	
	const mxEnd = 400;
	const myEnd = 300;	
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.pause(1)
		.perform();	
	
	const clone = await driver.findElement(By.id("cloneAnchor"));
	clonePos = await clone.getRect();

	assert.equal(clonePos.x, elPos.x);
	assert.equal(clonePos.y, elPos.y);	
	assert.equal(clonePos.width, elPos.width);	
	assert.equal(clonePos.height, elPos.height);	
	
	await driver.actions({async: true})	
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.perform();	
	
	clonePos = await clone.getRect();	
	assert.equal(clonePos.x, mxEnd);
	assert.equal(clonePos.y, myEnd);	
	
	await driver.actions({async: true})		
		.release()
		.perform();		
};


const inputsForDraggableAndCloneTests = [
	["draggableFree", true, false],
	["draggableFree", false, false],
	
	["draggableFreeFixed", true, false],
	["draggableFreeFixed", false, false],
	
	["draggableWithStyle", true, false],
	["draggableWithStyle", false, false],
];

inputsForDraggableAndCloneTests.forEach((argSet)=>{
	const position = argSet[0];
	const isScrolled = argSet[1];
	
	const scrolledTxt = (isScrolled) ? "scrolled" : "not scrolled";
	
	const desc = position+" draggable can be dragged when container is "+scrolledTxt;
	
	test(desc, async ()=>{ await draggableCanBeDragged.apply(null, argSet); });
});

inputsForDraggableAndCloneTests.forEach((argSet)=>{
	const position = argSet[0];
	const isScrolled = argSet[1];
	
	const scrolledTxt = (isScrolled) ? "scrolled" : "not scrolled";
	
	const desc = "clone of "+position+" draggbale renders before mousemove when container is "+scrolledTxt;
	
	test(desc, async ()=>{ await cloneRendersBeforeMouseMove.apply(null, argSet); });
});