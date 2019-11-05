const assert = require("assert");
const sinon = require("sinon");
const Sample = require("../../src/DragAndDrop.js").default;

suite("dragAndDrop.js");

function createFakeEl() {
	return {
		addEventListener: new sinon.fake(),
		removeEventListener: new sinon.fake()
	}
}

const fakeCallbacks = {notify: ()=>{}};

test("addEventListener calls config parser with config parameter", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const config = {type: "fake"};
	
	sample._parseConfig = new sinon.fake();
	
	sample.addEventListener(el, el, config, {}, fakeCallbacks);
	
	assert.equal(sample._parseConfig.callCount, 1);
	assert.equal(sample._parseConfig.lastCall.args[0], config);
});

test("addEventListener stores draggable listener information", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const config = {mode: "draggable", type: "fake"};	
	
	sample.addEventListener(el, el, config, {}, fakeCallbacks);
	
	assert.equal(sample.listeners.length, 1);
	assert.equal(typeof sample.listeners[0].cb, "function");
	assert.equal(sample.listeners[0].el, el);
});

test("addEventListener adds draggable event listener", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const config = {mode: "draggable", type: "fake"};	
	
	sample.addEventListener(el, el, config, {}, fakeCallbacks);

	assert.equal(el.addEventListener.callCount, 1);
	assert.equal(el.addEventListener.lastCall.args[0], "mousedown");
	assert.equal(typeof el.addEventListener.lastCall.args[1], "function");
});

test("addEventListener stores droppable listener information", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const config = {mode: "droppable", type: "fake"};	
	
	sample.addEventListener(el, el, config, {}, fakeCallbacks);
	
	assert.equal(sample.listeners.length, 1);
	assert.equal(typeof sample.listeners[0].cb, "function");
	assert.equal(sample.listeners[0].el, el);	
});

test("addEventListener adds droppable event listener", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const config = {mode: "droppable", type: "fake"};	
	
	sample.addEventListener(el, el, config, {}, fakeCallbacks);

	assert.equal(el.addEventListener.callCount, 1);
	assert.equal(el.addEventListener.lastCall.args[0], "mouseup");
	assert.equal(typeof el.addEventListener.lastCall.args[1], "function");	
});

test("addEventListener throws if callbacks parameter has invalid interface", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const config = {mode: "droppable", type: "fake"};	
	
	assert.throws(()=>{ sample.addEventListener(el, el, config, {} ); }, {message: /callbacks parameter/});	
	assert.throws(()=>{ sample.addEventListener(el, el, config, {}, []); }, {message: /callbacks parameter/});	
	assert.throws(()=>{ sample.addEventListener(el, el, config, {}, {}); }, {message: /callbacks parameter/});	
	assert.throws(()=>{ sample.addEventListener(el, el, config, {}, {notNotify: ()=>{}}); }, {message: /callbacks parameter/});	
});

test("removeEventListener calls mode verifier with mode parameter", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const mode = "sth";

	sample.listeners.push({el, cb: ()=>{}});
	sample._verifyMode = new sinon.fake();
	
	sample.removeEventListener(mode, el);
	
	assert.equal(sample._verifyMode.callCount, 1);
	assert.equal(sample._verifyMode.lastCall.args[0], mode);
});

test("removeEventListener sets draggableGotRemoved if mid dragging", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const mode = "draggable";
	
	assert.equal(sample.draggableGotRemoved, false);
	
	sample.listeners.push({el, cb: ()=>{}});
	sample.isDragging = false;
	sample.removeEventListener(mode, el);
	assert.equal(sample.draggableGotRemoved, false);	
	
	sample.listeners.push({el, cb: ()=>{}});
	sample.isDragging = true;
	sample.removeEventListener(mode, el);
	assert.equal(sample.draggableGotRemoved, true);
});

test("removeEventListener removes draggable listener", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const mode = "draggable";
	const cb = function unitTest(){}

	sample.listeners.push({el, cb});	
	sample.removeEventListener(mode, el);
	
	assert.equal(sample.listeners.length, 0);
	assert.equal(el.removeEventListener.callCount, 1);
	assert.equal(el.removeEventListener.lastCall.args[0], "mousedown");
	assert.equal(el.removeEventListener.lastCall.args[1], cb);
});

test("removeEventListener removes droppable listener", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const mode = "droppable";
	const cb = function unitTest(){}

	sample.listeners.push({el, cb});	
	sample.removeEventListener(mode, el);
	
	assert.equal(sample.listeners.length, 0);
	assert.equal(el.removeEventListener.callCount, 1);
	assert.equal(el.removeEventListener.lastCall.args[0], "mouseup");
	assert.equal(el.removeEventListener.lastCall.args[1], cb);	
});

test("removeEventListener throws if element parameter not found in listeners list", ()=>{
	const sample = new Sample();
	const el = createFakeEl();
	const mode = "draggable";
	
	assert.throws(()=>{ sample.removeEventListener(mode, el); }, {message: /remove event listener/});
});