// jsdom injected via vue cli

const assert = require("assert");
const sinon = require("sinon");
const {preprocessMixinConfig, preprocessDirectiveConfig, registerVuexInstance} = require("../../src/configPreprocessor.js");

suite("configPreprocessor.js");

function getMinWorkingOptions() {
	return {
		mode: "draggable"
	}
}

function getEl(id="") {
	const el = document.createElement("div");
	el.id = id;
	return el;
}

before(()=>{
	registerVuexInstance({dispatch: ()=>{}}, "none");
});

after(()=>{
	registerVuexInstance(null, null, true);
});

test("preprocessors return expected default config", ()=>{
	const el = getEl();
	
	const defaultConfig = (input, type) => ({
		type: undefined,
		mode: input[1].mode,
		greedy: false,
		draggableOnly: false,
		elMoving: (type === "mixin") ? null : input[0],
		data: {},
		multiDrag: null,
		cloneType: "copy",
		cloneWillChangeThreshold: 0
	});	
	
	function ass(preprocessor) {
		const input = [el, getMinWorkingOptions(), {}];
		const name = preprocessor.name;
		const type = (name === "preprocessMixinConfig") ? "mixin" : "directive";
		
		const config = preprocessor.apply(null, input);
		const defaults = defaultConfig(input, type);
		
		for(const prop in defaults) {
			const assMethod = (typeof config[prop] === "object") ? "deepEqual" : "strictEqual";
			assert[assMethod](defaults[prop], config[prop], "Error in "+name+" of "+prop);
		}
		assert.equal(config.callbacks.constructor.name, "PubSub", "Error in "+name+" of callbacks");			
	}
	
	ass(preprocessDirectiveConfig);
	ass(preprocessMixinConfig);
});

test("preprocessors return expected config when changed by user", ()=>{
	const elSource = document.createElement("div");
	const elMoving = document.createElement("div");
	const data = {};
	
	elSource.id = "source";
	elMoving.id = "moving";
	
	const user = {
		type: "unitTest",
		mode: "droppable",
		greedy: true,
		only: true,
		selector: "moving",
		data,
		multi: "multi",
		cloneType: "cheap",
		cloneWillChangeThreshold: 2		
	};
	
	document.body.appendChild(elMoving);

	function ass(_config) {
		//notice: input props don't map 100% to output props
		assert.equal(_config.type, "unitTest");
		assert.equal(_config.mode, "droppable");
		assert.equal(_config.greedy, true);
		assert.equal(_config.draggableOnly, true);
		assert.equal(_config.elMoving, elMoving);
		assert.equal(_config.data, data);
		assert.equal(typeof _config.multiDrag, "function");
		assert.equal(_config.cloneType, "cheap");
		assert.equal(_config.cloneWillChangeThreshold, 2);	
		assert.equal(_config.callbacks.constructor.name, "PubSub");
	}
	
	ass(preprocessDirectiveConfig(elSource, user, {}));
	ass(preprocessMixinConfig(elSource, user, {}));
	
	document.body.removeChild(elMoving);
});

test("preprocessors skip store callbacks if draggableOnly", ()=>{
	const el = getEl();
	const options = getMinWorkingOptions();
	options.only = true;
	
	function ass(_config) {
		const callbacks = _config.callbacks;
		
		assert.notEqual(callbacks.dragstart[0].name, "storeCallback");
		assert.notEqual(callbacks.dragmove[0].name, "storeCallback");
		assert.equal(callbacks.droppedAll.length, 0);
	}
	
	ass(preprocessDirectiveConfig(el, options, {}));
	ass(preprocessMixinConfig(el, options, {}));
});

test("preprocessors skip clone callbacks if cloneType null", ()=>{
	const el = getEl();
	const options = getMinWorkingOptions();
	options.cloneType = null;
	
	function ass(_config) {
		const callbacks = _config.callbacks;
		
		assert.equal(callbacks.dragstart.length, 1);
		assert.equal(callbacks.dragstart[0].name, "storeCallback");		
		assert.equal(callbacks.dragmove.length, 0);
		assert.equal(callbacks.dragstop[0].name, "storeCallback");		
		assert.equal(callbacks.dragstop.length, 1);
	}
	
	ass(preprocessDirectiveConfig(el, options, {}));
	ass(preprocessMixinConfig(el, options, {}));	
});

test("preprocessMixinConfig uses vnode to lookup multi drag property", ()=>{
	const el = getEl();
	const options = getMinWorkingOptions();
	const vnode = {context: {}};
	
	options.multi = "mixinTest";
	vnode.mixinTest = 123;
	vnode.context.mixinTest = 456;
	
	const res = preprocessMixinConfig(el, options, vnode);
	assert.equal(res.multiDrag(), 123);
});

test("preprocessDirectiveConfig uses vnode.context to lookup multi drag property", ()=>{
	const el = getEl();
	const options = getMinWorkingOptions();
	const vnode = {context: {}};
	
	options.multi = "mixinTest";
	vnode.mixinTest = 123;
	vnode.context.mixinTest = 456;
	
	const res = preprocessDirectiveConfig(el, options, vnode);
	assert.equal(res.multiDrag(), 456);	
});

test("preprocessMixinConfig throws if draggable element is not an HTML element", ()=>{
	assert.throws(()=>{ preprocessMixinConfig(); }, {message: /not an HTML element/});
});

test("preprocessors throw if arg is not 'draggable' / 'droppable'", ()=>{
	const el = getEl();
	assert.throws(()=>{ preprocessDirectiveConfig(el, {}, {}); }, {message: /Invalid directive mode/});
	assert.throws(()=>{ preprocessMixinConfig(el, {}, {}); }, {message: /Invalid directive mode/});
});

test("preprocessors throw if the selector option does not return DOM element", ()=>{
	const el = getEl();
	const options = getMinWorkingOptions();
	options.selector = "bollocks";
	
	assert.throws(()=>{ preprocessDirectiveConfig(el, options, {}); }, {message: /not return a DOM element/});
	assert.throws(()=>{ preprocessMixinConfig(el, options, {}); }, {message: /not return a DOM element/});
});

test("preprocessors throw if an undefined event is received in the store callback", ()=>{
	const el = getEl();
	const options = getMinWorkingOptions();
	
	function ass(_config) {
		assert.throws(()=>{ _config.callbacks.dragstart[0]("bollocks"); }, {message: /undefined event/});
		assert.throws(()=>{ _config.callbacks.droppingOver[0]("bollocks"); }, {message: /undefined event/});
		assert.throws(()=>{ _config.callbacks.dragstop[0]("bollocks"); }, {message: /undefined event/});
	}
		
	ass(preprocessDirectiveConfig(el, options, {}));
	ass(preprocessMixinConfig(el, options, {}));
});

test("preprocessors throw if Vuex has not been registered", ()=>{
	const el = getEl();
	registerVuexInstance(null, null, true);
	assert.throws(()=>{ preprocessDirectiveConfig(el, {}, {}); }, {message: /has not been installed/});
	assert.throws(()=>{ preprocessMixinConfig(el, {}, {}); }, {message: /has not been installed/});	
});

test("registerVuexInstance sets connection to vuex dispatch", ()=>{
	const el = getEl();
	const dispatch = new sinon.fake();	
	const namesapce = "NS";
	registerVuexInstance({dispatch}, namesapce);
	
	const params = {};
	const options = getMinWorkingOptions();
	
	function ass(_config) {
		const callbacks = _config.callbacks;
		callbacks.dragstart[0]("dragstart", params);
		callbacks.droppingOver[0]("droppingOver", params);
		callbacks.dragstop[0]("dragstop", params);
		
		assert.equal(dispatch.callCount, 3);
		assert.equal(dispatch.firstCall.args[0], namesapce+"/draggable");
		assert.equal(dispatch.firstCall.args[1], params);
		assert.equal(dispatch.secondCall.args[0], namesapce+"/droppable");
		assert.equal(dispatch.secondCall.args[1], params);
		assert.equal(dispatch.thirdCall.args[0], namesapce+"/done");
		assert.equal(dispatch.thirdCall.args[1], params);
		
		dispatch.resetHistory();
	}
	
	ass(preprocessDirectiveConfig(el, options, {}));
	ass(preprocessMixinConfig(el, options, {}));	
});