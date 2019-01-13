const express = require('express')
const app = express()
const port = 3000
var path = require('path')

//app.set('views', path.join(__dirname, 'public', 'views'));


app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '/public')));

//make routes
app.get('/', (req, res) => { res.sendFile(path.join(__dirname + '/public/views/index.html'))} )
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname + '/public/views/login.html'))} )
app.get('/register', (req, res) => {res.sendFile(path.join(__dirname + '/public/views/register.html'))})
app.get('/cart', (req, res) => {res.sendFile(path.join(__dirname + '/public/views/cart.html'))})

//app.post('/register', (req, res) => {


//})

app.post('/', function (req, res) {res.send('POST request to the homepage')})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
