const assert = require("assert");
const sample = require("../../src/store.js").default;

function commitGen(state, mutations) {
	return (cmd, data) => {mutations[cmd](state, data);}
}


suite("store.js");

test("getters.dragging returns true or false", ()=>{
	const state = {dragging: true};
	
	assert.equal(sample.getters.dragging(state), true);
	
	state.dragging = false;
	assert.equal(sample.getters.dragging(state), false);
})

test("getters.draggableId returns id of draggable if dragging, or null if not", ()=>{
	const state = {dragging: true, id: 123};
	
	assert.equal(sample.getters.draggableId(state), 123);
	
	state.dragging = false;
	assert.equal(sample.getters.draggableId(state), null);
});

test("getters.draggableType returns type of draggable if dragging, or null if not", ()=>{
	const state = {dragging: true, type: "testing"};
	
	assert.equal(sample.getters.draggableType(state), "testing");
	
	state.dragging = false;
	assert.equal(sample.getters.draggableType(state), null);
});


test("mutations.set uses correct function", ()=>{
	assert.equal(sample.mutations.set.name, "setPropVal");
});

test("mutations.addCallback adds new callback types", ()=>{
	const state = {callbacks: {}};
	
	sample.mutations.addCallback(state, {dragType: "a", dropType: "b", action: "c"});
	
	assert.ok("a" in state.callbacks);
	assert.ok("b" in state.callbacks.a);
	assert.equal(state.callbacks.a.b, "c");
});


test("actions.draggable inits state with manadatory event parameters", ()=>{
	const state = {dragging: false, id: -1, type: null};
	const data = {draggableType: "test", draggableData: null};
	const commit = commitGen(state, sample.mutations);
	
	sample.actions.draggable({state, commit}, data);
	
	assert.equal(state.dragging, true);
	assert.equal(state.id, -1);
	assert.equal(state.type, "test");
});

test("actions.draggable inits state with optional event parameters", ()=>{
	const state = {dragging: false, id: -1, type: null};
	const data = {draggableType: "test", draggableData: {id: 123}};
	const commit = commitGen(state, sample.mutations);
	
	sample.actions.draggable({state, commit}, data);
	
	assert.equal(state.id, 123);
});

test("actions.droppable dispatches callback action for matching drag/drop types", ()=>{
	const state = {callbacks: {a: {b: "userAction"}}};
	const data = {draggableType: "a", droppableType: "b"};
	
	let cmd = "";
	const dispatch = (c)=>{cmd=c;}
	
	sample.actions.droppable({state, dispatch}, data);
	
	assert.equal(state.callbacks.a.b, cmd);
});

test("actions.droppable passes through data parameter to user action", ()=>{
	const state = {callbacks: {a: {b: "userAction"}}};
	const data = {draggableType: "a", droppableType: "b"};
	
	let passthroughData = "";
	const dispatch = (c,d)=>{passthroughData=d;}
	
	sample.actions.droppable({state, dispatch}, data);

	assert.equal(passthroughData, data);	
});

test("actions.done resets state", ()=>{
	const state = {dragging: true, id: 123, type: "abc"};
	const commit = commitGen(state, sample.mutations);
	
	sample.actions.done({state, commit});
	
	assert.equal(state.dragging, false);
	assert.equal(state.id, -1);
	assert.equal(state.type, null);
});

test("actions.register throws for missing parameters", ()=>{
	let actions, dragType, dropType;
	assert.throws(()=>{ sample.actions.register(null, {actions, dragType}); }, {message: /Missing paratmeter/});
	assert.throws(()=>{ sample.actions.register(null, {actions, dropType}); }, {message: /Missing paratmeter/});
	assert.throws(()=>{ sample.actions.register(null, {dragType, dropType}); }, {message: /Missing paratmeter/});
});