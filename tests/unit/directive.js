const assert = require("assert");
const sinon = require("sinon");
const sample = require("../../src/directive.js").default;
const PubSub = require("../../src/PubSub.js").default;

suite("directive.js");

test("directive returns install function", ()=>{
	assert.equal(typeof sample, "function");
});

test("directive installer returns object with properties inserted and unbind", ()=>{
	const directive = sample(null, function dnd(){});
	assert.ok("inserted" in directive);
	assert.ok("unbind" in directive);
});

test("inserted calls dragAndDrop with correct parameters", ()=>{
	const addEventListener = new sinon.fake();
	function Dnd() {this.addEventListener = addEventListener;}
	const directive = sample(null, Dnd);
	
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
	const removeEventListener = new sinon.fake();
	function Dnd() {this.removeEventListener = removeEventListener}
	const directive = sample(null, Dnd);
	
	const el = {DOM: "element"}
	const context = {
		arg: "draggable"
	};	
	
	directive.unbind(el, context);
	
	assert.equal(removeEventListener.lastCall.args[0], context.arg);
	assert.equal(removeEventListener.lastCall.args[1], el);
});

test("directive throws if arg is not 'draggable' / 'droppable'", ()=>{
	function Dnd() {this.addEventListener = addEventListener;}
	const directive = sample(null, Dnd);	
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
	function Dnd() {this.removeEventListener = removeEventListener;}
	const directive = sample(null, Dnd);	
	const context = {
		arg: "draggable",
		value: {selector: "#bollocks"},
		modifiers: {}
	};	
	
	assert.throws(()=>{ directive.inserted({}, context); }, {message: /did not return a DOM element/});
});

test("directive throws if an undefined event is received in the store callback", ()=>{
	function Dnd() {this.addEventListener = addEventListener;}
	const addEventListener = new sinon.fake();
	const store = {dispatch: ()=>{}}
	const directive = sample(store, Dnd);
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