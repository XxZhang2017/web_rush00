var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'e_commerce'
});


//user home page:
app.get('/user', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.user_email + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//connect sql database:
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//handle post:
app.post('/auth', function(request, response) {
	var username = request.body.user_email;
	var password = request.body.user_password;
	if (username && password) {
		connection.query('SELECT * FROM User_info WHERE user_email = ? AND user_password = ?', [user_email, user_password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.user_email = user_email;
				response.send(<h1>Welcome </h1>);
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
