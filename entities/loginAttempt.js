'use strict';

//Model class for loginAttempt
class loginAttempt{
	constructor(in_loginAttemptId, in_triedUserName, in_timeStamp, in_ip, in_success){
		this.loginAttemptId = in_loginAttemptId;
		this.triedUserName = in_triedUserName;
		this.timeStamp = in_timeStamp;
		this.ip = in_ip;
		this.success = in_success;
	}

}