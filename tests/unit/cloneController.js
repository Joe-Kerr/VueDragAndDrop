// jsdom injected via vue cli

const assert = require("assert");
const sinon = require("sinon");
const {createClone, updateClone, destroyClone} = require("../../src/cloneController.js");

suite("cloneController.js");

const defaultElement = (id=null)=>{
	const el = global.document.createElement("div");
	if(id !== null) {el.id=id;}
	return el;
};

function getClone() {
	return document.body.appendChild.lastCall.args[0];
}

before(()=>{
	sinon.spy(document.body, "appendChild");
	sinon.spy(document.body, "removeChild");
});

after(()=>{
	document.body.appendChild.restore();
	document.body.removeChild.restore();
});

afterEach(()=>{
	if(document.body.appendChild.callCount !== document.body.removeChild.callCount) {
		throw new Error("Test setup error: clone not property cleaned up.");
	}
	
	document.body.appendChild.resetHistory();
	document.body.removeChild.resetHistory();	
});

test("createClone does nothing if type null", ()=>{
	createClone([], {type: null});
	assert.equal(document.body.appendChild.callCount, 0);
});

test("createClone creates one DOM node as cloneAnchor", ()=>{
	const draggables = [defaultElement("d1")];
	const type = "copy";
	createClone(draggables, {type});
	
	const anchor = getClone();
	assert.equal(document.body.appendChild.callCount, 1);
	assert.equal(anchor.id, "cloneAnchor");
	
	destroyClone();
});

test("createClone creates child DOM nodes of draggables parameter", ()=>{
	const draggables = [defaultElement("d1"), defaultElement("d2")];
	const type = "copy";
	createClone(draggables, {type});
	
	const anchor = getClone();
	const clones = anchor.children;
	assert.equal(clones[0].id, "cloned_d1");
	assert.equal(clones[1].id, "cloned_d2");
	
	destroyClone();	
});

test("createClone sets willChange according to config", ()=>{
	const draggables = [defaultElement("d1"), defaultElement("d2")];
	const type = "copy";
	let willChange, anchor;
	
	willChange = 0;
	createClone(draggables, {type, willChange});
	anchor = getClone();
	assert.equal(anchor.style.willChange, "");
	
	destroyClone();		
	
	willChange = 3;
	createClone(draggables, {type, willChange});
	anchor = getClone();
	assert.equal(anchor.style.willChange, "");
	
	destroyClone();		
	
	willChange = 2;
	createClone(draggables, {type, willChange});
	anchor = getClone();
	assert.equal(anchor.style.willChange, "transform");
	
	destroyClone();	
});


test("updateClone updates transform property of clone anchor", ()=>{
	const draggables = [defaultElement("d1"), defaultElement("d2")];
	const type = "copy";
	createClone(draggables, {type});	
	
	updateClone({deltaX: 6, deltaY: 13});
	const anchor = getClone();
	assert.equal(anchor.style.transform, "translate(6px, 13px)");
		
	destroyClone();	
});


test("destroyClone removes clone from DOM", ()=>{
	const draggables = [defaultElement("d1")];
	const type = "copy";
	createClone(draggables, {type});
	destroyClone();	
	
	assert.equal(document.body.removeChild.callCount, 1);
	assert.equal(document.body.appendChild.lastCall.args[0], document.body.removeChild.lastCall.args[0]);
});

