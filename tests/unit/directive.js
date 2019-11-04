const assert = require("assert");
const sinon = require("sinon");
const sample = require("../../src/directive.js").default;
const PubSub = require("../../src/PubSub.js").default;

suite("directive.js");

const addEventListener = new sinon.fake();
const removeEventListener = new sinon.fake();

function getSubsystems() {
	const noop = ()=>{};
	return {
		DragAndDrop: function S1() {this.addEventListener = addEventListener; this.removeEventListener = removeEventListener;},
		PubSub,
		cloneController: {createClone: noop, updateClone: noop, destroyClone: noop}
	}
}

afterEach(()=>{
	addEventListener.resetHistory();
	removeEventListener.resetHistory();
});

test("directive returns install function", ()=>{
	assert.equal(typeof sample, "function");
});

test("directive installer returns object with properties inserted and unbind", ()=>{
	const directive = sample(null, getSubsystems());
	assert.ok("inserted" in directive);
	assert.ok("unbind" in directive);
});

test("inserted calls dragAndDrop with correct parameters", ()=>{
	const directive = sample(null, getSubsystems());
	
	const el = {DOM: "element"}
	const context = {
		arg: "draggable",
		value: {data: "allTheUserData"},
		modifiers: {}
	};		
	
	directive.inserted(el, context);
	
	assert.equal(addEventListener.lastCall.args[0], el);
	assert.equal(addEventListener.lastCall.args[1], el);
	assert.equal(addEventListener.lastCall.args[3], context.value.data);
	assert.equal(addEventListener.lastCall.args[4].constructor.name, PubSub.name);
	
	const actualCfg = addEventListener.lastCall.args[2];
	const expectedCfgKeys = ["mode", "type", "greedy", "draggableOnly"];
	
	expectedCfgKeys.forEach((key)=>{ assert.ok(key in actualCfg, "Missing key '"+key+"' in config parameter of addEventListener."); });
	Object.keys(actualCfg).forEach((key)=>{ assert.ok( !(key in expectedCfgKeys), "Unexpected key '"+key+"' in config parameter of addEventListener."); });
	
});

test("unbind calls dragAndDrop with correct parameters", ()=>{
	const directive = sample(null, getSubsystems());	
	
	const el = {DOM: "element"}
	const context = {
		arg: "draggable"
	};	
	
	directive.unbind(el, context);
	
	assert.equal(removeEventListener.lastCall.args[0], context.arg);
	assert.equal(removeEventListener.lastCall.args[1], el);
});

test("directive throws if arg is not 'draggable' / 'droppable'", ()=>{
	const directive = sample(null, getSubsystems());	
	const context = {
		arg: "neitherDraggableNorDroppable",
		value: {},
		modifiers: {}
	};
	
	assert.throws(()=>{ directive.inserted({}, context); }, {message: /Invalid directive argument/});
	
	context.arg = "draggable";
	assert.doesNotThrow(()=>{ directive.inserted({}, context); });	
	context.arg = "droppable";
	assert.doesNotThrow(()=>{ directive.inserted({}, context); });
});

test("directive throws if the selector option does not return DOM element", ()=>{
	const directive = sample(null, getSubsystems());	
	const context = {
		arg: "draggable",
		value: {selector: "#bollocks"},
		modifiers: {}
	};	
	
	assert.throws(()=>{ directive.inserted({}, context); }, {message: /did not return a DOM element/});
});

test("directive throws if an undefined event is received in the store callback", ()=>{	
	const store = {dispatch: ()=>{}}
	const directive = sample(store, getSubsystems());
	const events = PubSub.events;
	
	const el = {DOM: "element"}
	const context = {
		arg: "draggable",
		value: {},
		modifiers: {}
	};		
	
	directive.inserted(el, context);
	const callback = addEventListener.lastCall.args[4].dragstart[0];
	
	assert.throws(()=>{ callback("anythingButTheOnesBelow", null); }, {message: /undefined event/});
	
	[events.dragstart, events.dragstopOnDroppable, events.dragstopAlways].forEach((legalEvent)=>{ assert.doesNotThrow(()=>{ callback(legalEvent, null); });  });
});