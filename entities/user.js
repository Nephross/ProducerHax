'use strict';

//Model class for user
class User {
	constructor(in_userId, in_userName, in_email, in_joinDate, in_pw_salt, in_pw_hash, in_profilePicture, in_userRole) {
    this.userId = in_userId;
    this.userName = in_userName;
    this.email = in_email;
    this.joinDate = in_joinDate;
    this.pw_salt = in_pw_salt;
    this.pw_hash = in_pw_hash;
    this.profilePicture = in_profilePicture;
    this.userRole = in_userRole;
  }
}

module.exports = User;