'use strict';

var express = require('express');
var router = express.Router();

var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	//Session set when user Request our app via URL
	if(sess.email) {
	/*
	* This line check Session existence.
	* If it existed will do some action.
	*/
	    res.redirect('/admin');
	}
	else {
	    res.render('index.vash');
	}

    res.render('index', { title: 'Express' });
});

module.exports = router;
