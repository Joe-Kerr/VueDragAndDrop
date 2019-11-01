const testSuite = require("../../../../../../+test_common/webdriverSuite.js");

//after all
after(async ()=>{
	await testSuite.quit();
});