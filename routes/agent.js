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



router.get('/agent/home', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoAgent){
	//si la variable existe retourner la vue dashboard

	fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => res.render('agent/home', { title: 'Express',blocks:body, data:req.cookies.infoAgent}));

}else{
	//sinon retourner connexion
	res.redirect("/connexionAgent")
}
});

router.get('/deconnexion', function(req, res, next) {
  //supprimer la variable cookie user
  res.clearCookie("infoAgent")
  //retourne la vue connexion
  res.redirect("/connexionAgent")
});

module.exports = router;