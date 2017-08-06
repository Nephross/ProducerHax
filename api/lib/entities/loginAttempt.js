'use strict';

// Model class for loginAttempt
class loginAttempt {
  constructor(inLoginAttemptId, inTriedUserName, inTimeStamp, inIp, inSuccess) {
    this.loginAttemptId = inLoginAttemptId;
    this.triedUserName = inTriedUserName;
    this.timeStamp = inTimeStamp;
    this.ip = inIp;
    this.success = inSuccess;
  }
}

module.exports = loginAttempt;
