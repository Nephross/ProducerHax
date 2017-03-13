'use strict';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;

const testCase = require('mocha').describe;
const assertion = require('mocha').it;

var users = require('./../../services/dal/users');




testCase("Testing count login attempt", function(){
	assertion("Connection established", function(){   

		let args = {
			arg1: 'Admin'
		};

		console.log("Running the query call from test");
		let testPromise = users.checkLoginAttempts(null, args);
		
		return assert.eventually.strictEqual(testPromise, null, "Connection not established.");
		
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