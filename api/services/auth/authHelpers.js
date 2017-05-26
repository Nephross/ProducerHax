'use strict';
var exports = module.exports = {};

//Import node built in crypto library
const crypto = require('crypto');


//returns a hashed password
let hashPassword = function (salt, password) {
	return new Promise((resolve, reject) =>{	
	
		//Recursive hashing algorithm to reduce effeciency of brute force attacks
		crypto.pbkdf2(password, salt, 200000, 1024, 'sha512', (err, key) => {
		  if (err) {
		  	return reject(err);
		  } else{
		  	return resolve(key.toString('base64'));
		  }
		});
		
	});
};

//Returns a secure-random 64byte base64 String
let generateSecureSalt = function (){
		return new Promise((resolve, reject) => {
			try{
				let salt = crypto.randomBytes(64).toString('base64');
				return resolve(salt);
			} catch(err){
				return reject(err);
			}
		});
};

let comparePassword = function (password, salt, pw_hash){
	return new Promise((resolve, reject) => {
		//Hash inputted password
		let hashPromise = hashPassword(salt, password);

		hashPromise.then(resolve=>{
			if(resolve === pw_hash){
				return resolve(true);
			}
			else{
				return reject(false);
			}
		}).catch(err=>{
			return reject(err);
		});


	});

};



exports.hashPassword = hashPassword;

exports.generateSecureSalt = generateSecureSalt;

exports.comparePassword = comparePassword;

