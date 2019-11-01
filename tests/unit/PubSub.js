const assert = require("assert");
const sinon = require("sinon");
const Sample = require("../../src/PubSub.js").default;

suite("PubSub.js");

test("PubSub instantiated with properties from static events", ()=>{
	const backup = Sample.events;
	Sample.events = {a: "b", c: "d"};
	
	const sample = new Sample();
	
	assert.ok("b" in sample);
	assert.ok("d" in sample);
	
	Sample.events = backup;
});

test("PubSub.subscribe adds callback to event array", ()=>{
	const sample = new Sample();
	const cb = ()=>{};
	
	sample.subscribe("dragstart", cb);
	assert.equal(sample.dragstart[0], cb);
});

test("PubSub.subscribe throws for undefined event", ()=>{
	const sample = new Sample();
	assert.throws(()=>{ sample.subscribe("bollocks") }, {message: /subscribe to undefined event/});
});

test("PubSub.notify calls callbacks of events with name and data parameter", ()=>{
	const sample = new Sample();
	const cb1 = new sinon.fake();
	const cb2 = new sinon.fake();
	const data = {a:1};
	sample.dragstart.push(cb1);
	sample.dragstart.push(cb2);
	
	sample.notify("dragstart", data);
	assert.equal(cb1.callCount, 1);
	assert.equal(cb2.callCount, 1);
	assert.equal(cb1.lastCall.args[0], "dragstart");
	assert.equal(cb1.lastCall.args[1], data);
	assert.equal(cb2.lastCall.args[0], "dragstart");
	assert.equal(cb2.lastCall.args[1], data);
});

test("PubSub.notify throws for undefined event", ()=>{
	const sample = new Sample();
	assert.throws(()=>{ sample.notify("bollocks") }, {message: /notify undefined event/});	
});

test("PubSub.getEvent returns event name by key", ()=>{
	const sample = new Sample();	
	assert.equal(sample.getEvent("dragmove"), Sample.events.dragmove);
});

test("PubSub.getEvent throws for undefined event", ()=>{
	const sample = new Sample();
	assert.throws(()=>{ sample.getEvent("bollocks") }, {message: /not found/});	
});