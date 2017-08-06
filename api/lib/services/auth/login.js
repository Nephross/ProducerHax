'use strict';

const auth = require('./authHelpers');
/*********************
*
* User tries to login with username and password
*- check to see if the userName exist -return if not
*- check to see if user has failed login 3 times within the last 10minutes return if they have
*- retrieve salt and pw_hash from DB and compare against the input return result
*- -- this result includes setting up session if it was true.
*
********************************************/
let login = function(userName, password) {
	return new Promise((resolve, reject) => {
		let loginAttempt = checkLoginAttempts(userName);

		if(loginAttempt && auth.comparePassword(password, salt, pw_Hash)){

			return resolve(true);
		} else {
			return resolve(false);
		}
	});
};

let checkLoginAttempts = function(userName) {
	//checks username against the database and sees if the username has been unsuccessfull a lot in a short time.
	//
	
	return new Promise((resolve, reject) => {
		//Query the database through DAL
	});

	//return result of database query
};