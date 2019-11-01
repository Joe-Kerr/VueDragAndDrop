const assert = require("assert");
const testSuite = require("../../../../../../+test_common/webdriverSuite.js");

//to=test objects
let driver, to={};

suite("Multi dragging");

async function scrollTo(x, y) {
	return driver.executeScript("window.scroll("+x+","+y+");");
}

before(async function() {	
	
	this.timeout(15000);
	
	//requires Apache
	await testSuite.open("http://localhost/OSS/vue_projects/projects/plugins/dragAndDrop/tests/system/multidrag.html");
	driver = testSuite.driver;
});

beforeEach(async ()=>{
	const {By} = testSuite;
	const ps = [];
	const ids = [
		"a1", "a2", "a3",
		"f1", "f2", "f3",
		"reset", "select"
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

test("subset of fixed and absolute draggables can be dragged when viewport not at origin", async ()=>{
	await to.select.click();
	await scrollTo(21, 32);
	
	const ids = ["a1", "a2", "a3", "f1", "f2", "f3"];
	
	const before = await Promise.all(ids.map((id)=>{
		return to[id].getRect();
	}));
	
	const mx0 = before[1].x; //a2
	const my0 = before[1].y;	
	const mxEnd = 400;
	const myEnd = 300;
	
	const dx = mxEnd - mx0;
	const dy = myEnd - my0;
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.release()
		.perform();	
		
	const after = await Promise.all(ids.map((id)=>{
		return to[id].getRect();
	}));

	for(let i=0, ii=ids.length; i<ii; i++) {
		if(i===0 || i===3) {
			assert.equal(before[i].x, after[i].x, "Expected draggable (x) #id "+ids[i]+" to not have moved.");
			assert.equal(before[i].y, after[i].y, "Expected draggable (y) #id "+ids[i]+" to not have moved.");				
			continue;
		}
		
		assert.equal(before[i].x + dx, after[i].x, "Expected draggable (x) #id "+ids[i]+" to have moved by "+dx);
		assert.equal(before[i].y + dy, after[i].y, "Expected draggable (y) #id "+ids[i]+" to have moved by "+dy);
	}
});

test("clones of fixed and absolute draggable subset render before mousemove when viewport not at origin", async ()=>{
	const {By} = testSuite;
	
	await to.select.click();
	await scrollTo(21, 32);
	
	const draggables = ["a2", "a3", "f2", "f3"];
	const clones = draggables.map((id)=>("cloned_"+id));
	let cloneRects;
	
	const before = await Promise.all(draggables.map((id)=>{
		return to[id].getRect();
	}));	
	
	const mx0 = before[0].x; //a2
	const my0 = before[0].y;	
	const mxEnd = 400;
	const myEnd = 300;
	
	const dx = mxEnd - mx0;
	const dy = myEnd - my0;
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.pause(1)
		.perform();

	cloneRects = await Promise.all(clones.map((id)=>{
		const toClone = driver.findElement(By.id(id));
		return toClone.getRect();
	}));	
		
	for(let i=0, ii=draggables.length; i<ii; i++) {
		assert.equal(before[i].x, cloneRects[i].x);
		assert.equal(before[i].y, cloneRects[i].y);
	}	
		
	await driver.actions({async: true})	
		.move({duration: 100, x: mxEnd, y: myEnd})
		.pause(1)
		.perform();

	cloneRects = await Promise.all(clones.map((id)=>{
		const toClone = driver.findElement(By.id(id));
		return toClone.getRect();
	}));

	for(let i=0, ii=clones.length; i<ii; i++) {
		assert.equal(before[i].x + dx, cloneRects[i].x, "Expected clone (x) #id "+clones[i]+" to have moved by "+dx);
		assert.equal(before[i].y + dy, cloneRects[i].y, "Expected clone (y) #id "+clones[i]+" to have moved by "+dy);
	}	
		
	await driver.actions({async: true})		
		.release()
		.perform();		
});

test("clone anchor has origin at top-left-most draggable", async ()=>{
	const {By} = testSuite;
	
	await to.select.click();
	await scrollTo(21, 32);
	
	const topLeft = await to.a2.getRect();
	const mx0 = topLeft.x; //a2
	const my0 = topLeft.y;	
	const mxEnd = 400;
	const myEnd = 300;
	
	await driver.actions({async: true})
		.move({x: mx0, y: my0}) 
		.press()
		.pause(1)
		.perform();	
	
	const anchor = await driver.findElement(By.id("cloneAnchor"));
	const anchorRect = await anchor.getRect();

	assert.equal(anchorRect.x, topLeft.x);
	assert.equal(anchorRect.y, topLeft.y);
	
	await driver.actions({async: true})		
		.release()
		.perform();				
});