const assert = require("assert");
const testSuite = require("../../../../../../+test_common/webdriverSuite.js");

//to=test objects
let driver, to={};

//after all
after(async ()=>{
	await testSuite.quit();
})

suite.only("Drag and drop system test");

async function dragAndDrop(from, to, x2=0, y2=0) {
	return driver.actions({async: true})
					.move({origin: from})
					.press()
					.move({duration: 100, origin: to, x: x2, y: y2})
					.pause(1)
					.release()
					.perform();
}

before(async function() {	
	
	this.timeout(15000);
	
	//requires Apache
	await testSuite.open("http://localhost/OSS/vue_projects/projects/plugins/dragAndDrop/tests/system/test.html");
	driver = testSuite.driver;
});

beforeEach(async ()=>{
	const {By} = testSuite;
	const ps = [];
	const ids = [
		"droppableOuter", "droppableInner", "droppableInnerFree", 
		"draggableToOuter", "draggableToInner", "draggableToBoth", "draggableFree", "draggableFreeFixed",
		"exWife", "overlappingNonObstructing", "log", "reset"
	];
	
	ids.forEach((id)=>{
		ps.push(driver.findElement(By.id(id)));
	});
	
	const res = await Promise.all(ps);
	
	ids.forEach((id, index)=>{
		to[id] = res[index];
	});		
	
	to.body = driver.findElement(By.css("body"));
});

afterEach(async ()=>{
	const {By, Key, until} = testSuite;
	await to.reset.click();
	await driver.wait(until.titleIs("ready"), 1000);
	await driver.executeScript("window.scroll(0,0);");
});

test("fixed draggable can be dragged when viewport not at origin", async ()=>{
	const before = await to.draggableFreeFixed.getRect();

	const mx0 = before.x;
	const my0 = before.y;	
	const mxEnd = 400;
	const myEnd = 300;	
	
	await driver.executeScript("window.scroll(21,32);");
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.release()
		.perform();	
	
	const after = await to.draggableFreeFixed.getRect();
	
	assert.equal(after.x, mxEnd+21);
	assert.equal(after.y, myEnd+32);	
});

test("absolute draggable can be dragged when viewport not at origin", async ()=>{	
	const before = await to.draggableFree.getRect();
	
	const mx0 = before.x;
	const my0 = before.y;	
	const mxEnd = 400;
	const myEnd = 300;
	
	await driver.executeScript("window.scroll(21,32);");
	
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
	let elPos = await to.draggableFreeFixed.getRect();
	let clonePos;
	
	const before = await to.draggableFreeFixed.getRect();

	const mx0 = before.x;
	const my0 = before.y;	
	const mxEnd = 400;
	const myEnd = 300;	
	
	await driver.executeScript("window.scroll(21,32);");
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.pause(1)
		.perform();	
	
	const clone = await driver.findElement(By.id("cloned_draggableFreeFixed"));
	clonePos = await clone.getRect();

	assert.equal(elPos.x + 21, clonePos.x);
	assert.equal(elPos.y + 32, clonePos.y);
	
	
	await driver.actions({async: true})	
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.perform();	
	
	clonePos = await clone.getRect();	
	assert.equal(clonePos.x, mxEnd+21);
	assert.equal(clonePos.y, myEnd+32);	
	
	await driver.actions({async: true})		
		.release()
		.perform();	
});

test("clone of aboslute draggable renders before mousemove when viewport not at origin", async ()=>{
	const {By} = testSuite;
	let elPos = await to.draggableFree.getRect();
	let clonePos;
	
	const before = await to.draggableFree.getRect();

	const mx0 = before.x;
	const my0 = before.y;	
	const mxEnd = 400;
	const myEnd = 300;	
	
	await driver.executeScript("window.scroll(21,32);");
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.pause(1)
		.perform();	
	
	const clone = await driver.findElement(By.id("cloned_draggableFree"));
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

test.only("clone has same dimension as element", async ()=>{
	const {By} = testSuite;
	const elDim = await to.draggableFree.getRect();
	
	let borderWidth = await to.draggableFree.getCssValue("borderWidth");
	borderWidth = parseInt(borderWidth.replace("px", "")) * 2;
	
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
		
	const clone = await driver.findElement(By.id("cloned_draggableFree"));	
	const cloneDim = await clone.getRect();
	
	assert.equal(cloneDim.width, elDim.width+borderWidth);
	assert.equal(cloneDim.height, elDim.height+borderWidth);
	
	await driver.actions({async: true})	
		.release()
		.perform();	
});

//draggableOuter over outer
test("draggable over matching droppable fires", async ()=>{
	await dragAndDrop(to.draggableToOuter, to.droppableOuter, 150, 150);
	
	const txt = await to.log.getText();
	assert.equal(txt, "draggableOuterToDroppableOuter 1");
});

//draggableInner over outer
test("draggable over non-matching droppable doesn't fire", async ()=>{
	await dragAndDrop(to.draggableToInner, to.droppableOuter, 150, 150);
	
	const txt = await to.log.getText();
	assert.equal(txt, "0");	
});

//draggbaleBoth over inner free
test("draggable over two matching droppables fires twice", async ()=>{
	await dragAndDrop(to.draggableToBoth, to.droppableInnerFree);
	
	const txt = await to.log.getText();
	assert.equal(txt, "draggableBothToDroppableOuter 2");	
});

//draggableInner over inner free
test("draggable over two droppables where first matches fires for first", async ()=>{
	await dragAndDrop(to.draggableToInner, to.droppableInnerFree);
	
	const txt = await to.log.getText();
	assert.equal(txt, "draggableInnerToDroppableInner 1");		
});

//draggableOuter over inner free
test("draggable over two droppables where second matches fires for second", async ()=>{
	await dragAndDrop(to.draggableToOuter, to.droppableInnerFree);
	
	const txt = await to.log.getText();
	assert.equal(txt, "draggableOuterToDroppableOuter 1");		
});

//draggableBoth over inner
test("draggable over two matching droppables where first is greedy fires for first", async ()=>{
	await dragAndDrop(to.draggableToBoth, to.droppableInner);
	
	const txt = await to.log.getText();
	assert.equal(txt, "draggableBothToDroppableInner 1");		
});

//draggableInner over overlapping1
test("draggable over obstructing child of matching droppable fires", async ()=>{
	await dragAndDrop(to.draggableToInner, to.overlappingNonObstructing);
	
	const txt = await to.log.getText();
	assert.equal(txt, "draggableInnerToDroppableInner 1");		
});

test("draggable without droppable fires dragstop / doesn't fire for droppables", async ()=>{
	const beforeX = await to.draggableFree.getCssValue("left");
	const beforeY = await to.draggableFree.getCssValue("top");
	
	await dragAndDrop(to.draggableFree, to.droppableInnerFree);
	
	const afterX = await to.draggableFree.getCssValue("left");
	const afterY = await to.draggableFree.getCssValue("top");	
	
	const txt = await to.log.getText();
	assert.equal(txt, "0");		
	assert.notEqual(beforeX, afterX);
	assert.notEqual(beforeY, afterY);
});

test("draggable that is also droppable doesn't fire for itself", async ()=>{
	await dragAndDrop(to.draggableDroppable, to.draggableDroppable);
	
	const txt = await to.log.getText();
	assert.equal(txt, "0");		
});
