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
		 "reset"
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

test("fixed draggable can be dragged when viewport not at origin", async ()=>{
	await scrollTo(21, 32);
	
	const before = await to.draggableFreeFixed.getRect();
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
	
	const after = await to.draggableFreeFixed.getRect();

	assert.equal(after.x, mxEnd);
	assert.equal(after.y, myEnd);	
});


test("absolute draggable can be dragged when viewport not at origin", async ()=>{	
	await scrollTo(21, 32);	
	
	const before = await to.draggableFree.getRect();
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
	
	const after = await to.draggableFree.getRect();
	
	assert.equal(after.x, mxEnd);
	assert.equal(after.y, myEnd);
});

test("clone of fixed draggable renders before mousemove when viewport not at origin", async ()=>{
	const {By} = testSuite;
	await scrollTo(21, 32);	
	
	let elPos = await to.draggableFreeFixed.getRect();
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

	assert.equal(elPos.x, clonePos.x);
	assert.equal(elPos.y, clonePos.y);
		
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
});

test("clone of aboslute draggable renders before mousemove when viewport not at origin", async ()=>{
	const {By} = testSuite;
	await scrollTo(21, 32);	
	
	let elPos = await to.draggableFree.getRect();
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

	assert.equal(elPos.x, clonePos.x);
	assert.equal(elPos.y, clonePos.y);	
	
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
});

test("clone has same dimension as element", async ()=>{
	const {By} = testSuite;
	const elDim = await to.draggableFree.getRect();
	
	const mx0 = elDim.x;
	const my0 = elDim.y;		
	const mxEnd = 400;
	const myEnd = 300;
	
	await driver.executeScript("window.scroll(21,32);");
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.perform();
		
	const clone = await driver.findElement(By.id("cloneAnchor"));	
	const cloneDim = await clone.getRect();
	
	assert.equal(cloneDim.width, elDim.width);
	assert.equal(cloneDim.height, elDim.height);
	
	await driver.actions({async: true})	
		.release()
		.perform();	
});