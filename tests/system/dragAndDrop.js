const assert = require("assert");
const testSuite = require("../../../../../../+test_common/webdriverSuite.js");

//to=test objects
let driver, to={};

suite("Drag and drop");

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
	await testSuite.open("http://localhost/OSS/vue_projects/projects/plugins/dragAndDrop/tests/system/dragAndDrop.html");
	driver = testSuite.driver;
});

beforeEach(async ()=>{
	const {By} = testSuite;
	const ps = [];
	const ids = [
		"droppableOuter", "droppableInner", "droppableInnerFree", 
		"draggableToOuter", "draggableToInner", "draggableToBoth", "draggableFree",
		"overlappingNonObstructing", "log", "reset"
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
