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


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sinistre'

})

router.get('/home', function(req, res, next) {

if(req.cookies.infoAgent){
  con.connect(()=>{

    console.log(req.cookies.infoAgent)
    let temps = new Date()
    let sql  = "select * from sinistrevoldetails where niveau = ?"
    con.query(sql,["O/E"],(err,result,fields)=>{
      fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
     
      let sql  = "select * from sinistreidetails where niveau = ?"
      con.query(sql,["O/E"],(err,resulti,fields)=>{

        let sql  = "select * from sinistrebdgdetails where niveau = ?"
      con.query(sql,["O/E"],(err,resultbdg,fields)=>{
res.render('agent/sinistres/index', { title: 'Express',blocks:body,sinistreV:resulti,sinistreb:resultbdg, sinistres:result, infoAgent:req.cookies.infoAgent})
})
    })
    })
    })
  })
  //si la variable existe retourner la vue dashboard
      
}else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}
});


router.get('/sendResult/:numpolice', function(req, res, next) {

if(req.cookies.infoAgent){

  
res.render('agent/form', { title: 'Express',numero_police:req.params.numpolice,infoAgent:req.cookies.infoAgent})
}
  //si la variable existe retourner la vue dashboard
  else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}

});

router.get('/home/gestion', function(req, res, next) {

if(req.cookies.infoAgent){
  con.connect(()=>{

    let temps = new Date()
    let sql  = "select * from declaration_2 where nom = ? and prenoms = ?"
    con.query(sql,[req.cookies.infoAgent.nom ,req.cookies.infoAgent.prenoms],(err,result,fields)=>{
      fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
res.render('agent/form/gerer_sinistre', { title: 'Express',blocks:body, sinistres:result, data:req.cookies.infoAgent})
})
    })
    })
  //si la variable existe retourner la vue dashboard
      
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