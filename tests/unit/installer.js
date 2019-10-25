const assert = require("assert");
const sinon = require("sinon");

const {cats4Vue} = require("cats4vue");

const sample = require("../../src/index.js").default;

suite("index.js");

const vuex = {dispatch: ()=>{}, registerModule: ()=>{}};
const Vue = {directive: ()=>{}};

before(()=>{
	sinon.spy(cats4Vue, "registerVuexModule");
});

after(()=>{
	cats4Vue.registerVuexModule.restore();
});

test("index.js provides expected exports", ()=>{
	assert.equal(typeof require("../../src/index.js").default, "object");
	assert.equal(typeof require("../../src/index.js").installer, "object");
});

test("installer calls all utility functions", ()=>{
	sample.install(Vue, {vuex});
	assert.equal(cats4Vue.registerVuexModule.callCount, 1);
});

test("installer registers store with correct namespace", ()=>{
	sample.install(Vue, {vuex});
	assert.equal(cats4Vue.registerVuexModule.lastCall.args[1], "drag&drop");

	sample.install(Vue, {vuex, namespace: "custom_ns"});
	assert.equal(cats4Vue.registerVuexModule.lastCall.args[1], "custom_ns");	
})

test("installer registers directive with correct name", ()=>{
	let directiveName;
	sample.install({directive: (name)=>{directiveName=name;}}, {vuex});	
	assert.equal(directiveName, "drag&drop");
	
	sample.install({directive: (name)=>{directiveName=name;}}, {vuex, directive: "custom-dnd"});	
	assert.equal(directiveName, "custom-dnd");
})