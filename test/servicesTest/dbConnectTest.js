'use strict';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;

const testCase = require('mocha').describe;
const assertion = require('mocha').it;

var testCon = require('./../../services/dal/testConQuery');




testCase("Testing connection to the database", function(){
	assertion("Connection established", function(){   

		let args = {
			arg1: 1
		};

		console.log("Running the query call from test");
		let testPromise = testCon(null, args);
		
		return assert.eventually.strictEqual(testPromise, 42, "Connection not established.");
		
	});

	assertion("Using a Promise that resolves successfully with wrong expectation!", function() {
	    let testPromise2 = new Promise((resolve, reject) => {
	        setTimeout(function() {
	            resolve("Hello World!");
	        }, 200);
	    });

	    return assert.eventually.notEqual(testPromise2, "Hello!", "Testing that this will fail.");
	    
	});
});
