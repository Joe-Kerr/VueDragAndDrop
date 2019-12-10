const assert = require("assert");
const {getRectAbs} = require("../../src/helpers.js");

suite("helpers.js");

const backups = {};

let position = "absolute";
let x = 10;
let y = 20;
let width = 30;
let height = 40;

const computedStyles = ()=>({
		borderLeftWidth: "10px",
		borderRightWidth: "12px",
		borderTopWidth: "14px", 
		borderBottomWidth: "16px",

		paddingLeft:"18px",
		paddingRight:"20px",
		paddingTop: "22px",
		paddingBottom: "24px",

		marginLeft: "26px",
		marginTop: "28px",

		position
});

const el = {
	offsetLeft: 100,
	offsetTop: 200,
	getBoundingClientRect: ()=>({x, y, width, height}),
	parentNode: {
		style: {transform: ""},
		parentNode: {
			style: {transform: ""},
			parentNode: {
				parentNode: null
			}
		}
	}
};

before(()=>{
	backups.window = window;
	
	window = {
		getComputedStyle: computedStyles,
		pageXOffset: 22,
		pageYOffset: 32
	};
});

after(()=>{
	window = backups.window;
	backups.window = null;
});

beforeEach(()=>{
	window.pageXOffset = 22;
	window.pageYOffset = 32;
	x = 10;
	y = 20;
	width = 30;
	height = 40;	
	el.parentNode.parentNode.style.transform = "";
});

//
// Parameterized tests
//

const parameterizedTests = [
{
	test: "getRectAbs extracts expected values from absolute DOM node",
	prep() { position = "absolute"; },
	parameters: {
		position: "absolute",
		absX: 10 + 22 - 26,
		absY: 20 + 32 - 28,
		offsetX: 100 - 26,
		offsetY: 200 - 28,
		outerWidth: 30,
		outerHeight: 40,
		width: 30 - 10-12 - 18-20,
		height: 40 - 14-16 - 22-24
	}
},

{
	test: "getRectAbs extracts expected values from fixed DOM node",
	prep() { position = "fixed"; },
	parameters: {
		position: "fixed",
		absX: 10 - 26,
		absY: 20 - 28,
		offsetX: 100 - 26,
		offsetY: 200 - 28,
		outerWidth: 30,
		outerHeight: 40,
		width: 30 - 10-12 - 18-20,
		height: 40 - 14-16 - 22-24
	}
}
]

parameterizedTests.forEach((testData, i)=>{	
	test(testData.test, ()=>{
		testData.prep();
	
		const res = getRectAbs(el);
		
		const params = testData.parameters;
		for(const prop in params) {
			assert.equal(res[prop], params[prop], "Assertion failed for '"+prop+"' of param set "+i);
		}
	});
});

//
// Manual tests
//

test("getRectAbs returns expected data object", ()=>{
	const expected = ["position", "absX", "absY", "outerWidth", "outerHeight", "offsetX", "offsetY", "width", "height"].sort();
	const actual = Object.keys(getRectAbs(el)).sort();
	
	assert.deepEqual(actual, expected);
});


test("getRectAbs throws for invalid pixel values", ()=>{
	let dataFail;
	window.getComputedStyle = ()=>{
		const styles = computedStyles();
		styles.borderLeftWidth = dataFail;
		return styles;
	};	
	
	dataFail = "10px 5px 5px 1px";
	assert.throws(()=>{ getRectAbs(el); }, {message: /Failed to parse pixel value/});
		
	dataFail = "10em";
	assert.throws(()=>{ getRectAbs(el); }, {message: /Failed to parse pixel value/});		
	
	//false positive
	dataFail = "4.2px";
	assert.doesNotThrow(()=>{ getRectAbs(el); });
});