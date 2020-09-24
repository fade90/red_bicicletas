const passport = require('passport');
const usuario = require('../models/usuario');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');


passport.use(new localStrategy(
    function(email, password, done){
        Usuario.findOne({email: email}, function(err, usuario){
            if (err) return done(err);
            if (!usuario) return done(null, false,{ message: 'email no existente o incorrecto'});
            if (!usuario.validPassword(password)) return done(null, false, {message: 'Password incorrecto'});

            return done(null, usuario);
        });
    }
));

passport.serializeUser(function(user, cb){
    cb(null, user.id);
});


passport.deserializeUser(function(id, cb){
    usuario.findById(id, function(err, usuario){
        cb(err, usuario);
    });
});

module.exports = passport;