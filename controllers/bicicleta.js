  
var Bicicleta = require("../models/bicicleta");

exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis(function (err, bicis) {
        res.render('bicicletas/index', { bicis: bicis });
    });
}

exports.bicicleta_create_get = function(req, res){    
    res.render("bicicletas/create");
}

exports.bicicleta_create_post = function (req, res) {
    var bici = new Bicicleta({
        id: req.body.id,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lon]
    });

    Bicicleta.add(bici, function (err, newBici) {
        res.redirect('/bicicletas');
    });
}

exports.bicicleta_update_get = function (req, res) {
    Bicicleta.findById(req.params.id, function (err, bici) {
        res.render('bicicletas/update', { bici });
    });
}


exports.bicicleta_update_post = function (req, res) {
    Bicicleta.findById(req.params.id, function (err, bici) {
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lon];
        bici.save();
        
        res.redirect('/bicicletas');
    });
}


exports.bicicleta_delete_post = function (req, res){
    Bicicleta.removeId(req.params.id);
    
    res.redirect("/bicicletas");
}

