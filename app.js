require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var tokenRouter = require('./routes/token');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');
var authApiRouter = require('./routes/api/auth');


const store = new session.MemoryStore;

var app = express();

app.set('secretKey', 'jwt_pwd_!!223344');

app.use(session({
  cookie: { maxAge: 240 * 60 *60 * 1000 },
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicis_ªª·"!·"!·!"·1465' 
}));

var mongoose = require("mongoose");

// si estoy en el ambiente de desarrollo > USAR >>
//var mongoDB = "mongodb://localhost/red_bicicletas";
// sino USAR >>
var mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise =global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res){
  res.render('session/login');
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, usuario, info){
    if (err) return next(err);
    if (!usuario) return res.render('session/login', {info});
    req.logIn(usuario, function(err){
      if (err) return next(err);
      return res.redirect('/');
    })
  })(req, res, next);
});

app.get('/logout', function(req , res){
  req.logOut();
  res.redirect('/');
});

app.get('/forgotPassword', function(req, res){

});

app.post('/forgotPassword', function(req, res){

});




app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);

app.use('/bicicletas', loggedIn, bicicletasRouter);

app.use('/api/auth', authApiRouter);
app.use('/api/bicicletas', validarUsuario, bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);

app.use('/privacy_policy', function (req, res) {
  res.sendFile('public/privacy_policy.html');
});


app.use('/googlebec72500f75c9e45', function (req, res) {
  res.sendFile('public/googlebec72500f75c9e45.html');
});


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req, res, next){
  if (req.user){
    next();
  } else {
    console.log('user sin loguearse');
    res.redirect('/login');
  }
};

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded){
    if (err) {
      res.json({ status: "error", message: err.message, data: null});
    } else {
      req.body.userId = decoded.id;
      console.log('jwt verify:' + decoded);
      next();
    }
  });
}

module.exports = app;
