const assert = require("assert");
const sinon = require("sinon");
const sample = require("../../src/directive.js").default;
const PubSub = require("../../src/PubSub.js").default;

suite("directive.js");

const addEventListener = new sinon.fake();
const removeEventListener = new sinon.fake();
const preprocessDirectiveConfig = new sinon.fake(()=>({
	elMoving: "elMovingFromPreprocessor",
	data: "dataMovingFromPreprocessor", 
	callbacks: "callbacksMovingFromPreprocessor"
}));

function getSubsystems() {
	const noop = ()=>{};
	return {
		dragAndDropInstance: new function S1() {this.addEventListener = addEventListener; this.removeEventListener = removeEventListener;},
		preprocessDirectiveConfig
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
		modifiers: {m:1}
	};		
	
	directive.inserted(el, context);
	
	assert.equal(addEventListener.lastCall.args[0], el);
	assert.equal(addEventListener.lastCall.args[1], "elMovingFromPreprocessor");
	assert.equal(addEventListener.lastCall.args[3], "dataMovingFromPreprocessor");
	assert.equal(addEventListener.lastCall.args[4], "callbacksMovingFromPreprocessor");	
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