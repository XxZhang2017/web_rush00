const express = require('express')
const app = express()
const port = 3000
var path = require('path')
var bodyParser = require('body-parser');

//app.set('views', path.join(__dirname, 'public', 'views'));


app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
//app.use(express.static(path.join(__dirname, '/public')));

//make routes
app.get('/', (req, res) => { res.sendFile(path.join(__dirname + '/public/views/index.html'))} )
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname + '/public/views/login.html'))} )
app.get('/register', (req, res) => {res.sendFile(path.join(__dirname + '/public/views/register.html'))})
app.get('/cart', (req, res) => {res.sendFile(path.join(__dirname + '/public/views/cart.html'))})


//app.post('/register', (req, res) => {


//})
//login:
var mysql = require('mysql');
//var express = require('express');
var session = require('express-session');

//var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123',
	database : 'e_commerce'
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });
//connect sql database:
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/auth', function(request, response) {
	var user_email = request.body['user_email'];
	var user_password = request.body['user_password'];
	if (user_email && user_password) {
		connection.query('SELECT * FROM User_info WHERE user_email = ? AND user_password = ?', [user_email, user_password], function(error, results, fields) {

			 if (results.length > 0) {
				var reg = results[0].user_email;
				response.send('<h1>welcome ' + reg +'</h1>');

			} else {
				response.redirect('/login');
			}			
			response.end();
		});

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});




app.post('/', function (req, res) {res.send('POST request to the homepage')})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
