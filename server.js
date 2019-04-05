// Configuration______________________________________________________
var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
// const flash = require('express-flash');
// const session = require('express-session');
// for login/reg
// const cookieParser = require('cookie-parser'); // remember this is middleware 

// ____________________________________________________________________|

//Express Setting______________________________________________________
//app.use(express.static(path.join(__dirname, './static'))); //this was already commented out

// app.use(express.static(__dirname + '/static')); //this will need to be deleted
app.use(express.static(__dirname + '/public/dist/public')); 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// app.use(flash());
// for login/reg
// app.use(cookieParser('randomStringText'))
// app.use(session({
//   saveUninitialized: true,
//   secret: 'someSecretText',
//   resave: false, 
//   name: 'session',
//   rolling: true,//for expiration
//   cookie: {
//     secure: false,
//     httpOnly: false,
//     maxAge: 3600000 ,// when cookie will expire
//   }
// }))
// ____________________________________________________________________|

app.use(function(req, res, next) {
  console.log(req.url, req.method);
  next();
});

//Mongoose Setting_____________________________________________________
mongoose.connect('mongodb://localhost/pet');
require('./server/models/pet');
mongoose.Promise = global.Promise;
// ____________________________________________________________________|

//Routing______________________________________________________________
require('./server/config/routes.js')(app);
// this route will be triggered if any of the express routes do not match
app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
});
// ____________________________________________________________________|

//App listening________________________________________________________
app.listen(8005, function() {
  console.log('listening on port 8005');
});
// ___________________________________________________________________|