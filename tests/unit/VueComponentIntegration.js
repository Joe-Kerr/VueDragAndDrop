const assert = require("assert");
const sinon = require("sinon");
const {installer, hotDNDMixin} = require("../../src/index.js");
const root = require("../unit_fix/integrationTestSetup.vue").default;

const vuex = require("vuex");
const {mount, createLocalVue} = require("@vue/test-utils");

let vue, localVue, store;

suite("Vue directive and mixin integration");

function wait(ms) {
	return new Promise((resolve)=>{
		setTimeout(()=>{resolve();}, ms);
	});
}

async function trigger(name, target=global.document) {
	target.dispatchEvent(new global.window.MouseEvent(name, {bubbles: true, cancelable: true, target}));
	await wait(150);
}

before(()=>{
	localVue = createLocalVue();
	localVue.use(vuex);
	store = new vuex.Store({});	
	localVue.use(installer, {
		vuex: store
	});			
	
	vue = mount(root, {store, localVue});
	
	assert.ok(vue.contains("#directive"));
	assert.ok(vue.contains("#mixin"));
});

test("Get response from directive", async ()=>{	
	assert.strictEqual(vue.vm.directiveResponse, null);
	
	vue.find("#directive").trigger("mousedown");
	assert.strictEqual(vue.vm.directiveResponse, "directive");
	
	await trigger("mouseup");
});

test("Get response from mixin", async ()=>{
	assert.strictEqual(vue.vm.mixinResponse, null);
	
	vue.find("#mixin").trigger("mouseenter");
	assert.strictEqual(vue.vm.mixinResponse, "mixin");	
	
	await trigger("mouseup");
});