'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});



app.post('/login',function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let originip = req.headers['x-forwarded-for'];
  



  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.username=req.body.username;
  res.end('done');
});





app.get('/admin',function(req,res){
	sess = req.session;
	if(sess.email) {
	res.write('<h1>Hello '+sess.email+'</h1>');
	res.end('<a href="+">Logout</a>');
	} else {
	    res.write('<h1>Please login first.</h1>    ');
	    res.end('<a href="+">Login</a>');
	}
});



app.get('/logout',function(req,res){
	req.session.destroy(function(err) {
    if(err) {
    	console.log(err);
    } else {
    	res.redirect('/');
    }
});

module.exports = router;
