'use strict';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;

const testCase = require('mocha').describe;
const assertion = require('mocha').it;

/*
var testCon = require('./../../services/dal/testUserCrud');




testCase("Testing createUser", function(){
	assertion("userCreated", function(){   

		let args = {
			arg1: 1
		};

		console.log("Running the query call from test");
		let testPromise = testCon(null, args);
		
		return assert.eventually.strictEqual(testPromise, 42, "Connection not established.");
		
	});

});

*/