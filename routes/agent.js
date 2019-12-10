var express = require('express');
var bodyParser = require("body-parser");
var app = require("express")();
var mysql = require('mysql');
var db= require('../database/db');
var fetch =require('node-fetch');
let checkstatus = require('checkstatus');
let parseJSON = require('parse-json');
let logError = require('log-error');
var cors = require("cors");
var router = express.Router();
var fetch =require('node-fetch');
var cookieParser = require('cookie-parser')
app.use(cookieParser())





router.get('/connexionUser', function(req, res, next) {
res.render('connexionUser', { title: 'Express'})
});

router.get('/connexionAgent', function(req, res, next) {
res.render('connexionAgent', { title: 'Express'})
});

router.get('/deconnexion', function(req, res, next) {
	//supprimer la variable cookie user
	res.clearCookie("infoAgent")
	//retourne la vue connexion
	res.redirect("/connexionAgent")
});


router.get('/agent', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.agent){
	//si la variable existe retourner la vue dashboard
res.render('agent/home', { title: 'Express'})
}else{
	//sinon retourner connexion
	res.redirect("/connexionAgent")
}
});



module.exports = router;