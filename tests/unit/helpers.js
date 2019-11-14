const assert = require("assert");
const {getRectAbs} = require("../../src/helpers.js");

suite("helpers.js");

const backups = {};

const computedStyles = {
		borderLeftWidth: "10px",
		borderRightWidth: "11px",
		borderTopWidth: "12px", 
		borderBottomWidth: "13px",

		paddingLeft:" 14px",
		paddingRight:" 15px",
		paddingTop: "16px",
		paddingBottom: "17px",

		marginLeft: "18px",
		marginTop: "19px",

		position: "absolute"
	};

function getComputedStyleFake() {
	return computedStyles;
}

function getBoundingClientRectFake() {
	return {
		x: 1,
		y: 2,
		width: 3,
		height: 4
	};
}

before(()=>{
	backups.window = window;
	
	window = {
		getComputedStyle: getComputedStyleFake,
		pageXOffset: 21,
		pageYOffset: 32
	};
});

after(()=>{
	window = backups.window;
	backups.window = null;
});

test("getRectAbs returns expected data object", ()=>{
	const expected = ["position", "outerX", "outerY", "outerWidth", "outerHeight", "left", "top", "width", "height"].sort();
	const actual = Object.keys(getRectAbs({getBoundingClientRect: getBoundingClientRectFake})).sort();
	
	assert.deepEqual(actual, expected);
});

test("getRectAbs extracts expected values from DOM node", ()=>{
	const res = getRectAbs({getBoundingClientRect: getBoundingClientRectFake});
	
	assert.equal(res.position, "absolute");
	assert.equal(res.outerX, 22);
	assert.equal(res.outerY, 34);
	assert.equal(res.outerWidth, 3);
	assert.equal(res.outerHeight, 4);
	assert.equal(res.left, 4);
	assert.equal(res.top, 15);
	assert.equal(res.width, -47);
	assert.equal(res.height, -54);
});

test("getRectAbs throws for invalid pixel values", ()=>{
	computedStyles.borderLeftWidth = "!!px";
	assert.throws(()=>{ getRectAbs({getBoundingClientRect: getBoundingClientRectFake}) }, {message: /Failed to parse pixel value/});
	
	computedStyles.borderLeftWidth = "10px";
});

test("adapt to change in measurement system");