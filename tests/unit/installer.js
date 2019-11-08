const assert = require("assert");
const sinon = require("sinon");

const {cats4Vue} = require("cats4vue");

const {installer, hotDNDMixin} = require("../../src/index.js");

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
	assert.equal(typeof require("../../src/index.js").hotDNDMixin, "object");
});

test("hotDNDMixin returns Vue method mixin", ()=>{
	assert.ok("methods" in hotDNDMixin);
	assert.equal(typeof hotDNDMixin.methods.hotDND, "function");
});

test("installer calls all utility functions", ()=>{
	installer.install(Vue, {vuex});
	assert.equal(cats4Vue.registerVuexModule.callCount, 1);
});

test("installer registers store with correct namespace", ()=>{
	installer.install(Vue, {vuex});
	assert.equal(cats4Vue.registerVuexModule.lastCall.args[1], "drag&drop");

	installer.install(Vue, {vuex, namespace: "custom_ns"});
	assert.equal(cats4Vue.registerVuexModule.lastCall.args[1], "custom_ns");	
})

test("installer registers directive with correct name", ()=>{
	let directiveName;
	installer.install({directive: (name)=>{directiveName=name;}}, {vuex});	
	assert.equal(directiveName, "drag&drop");
	
	installer.install({directive: (name)=>{directiveName=name;}}, {vuex, directive: "custom-dnd"});	
	assert.equal(directiveName, "custom-dnd");
})