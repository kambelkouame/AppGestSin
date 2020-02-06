var express = require('express');
var bodyParser = require("body-parser");
var app = require("express")();
var mysql = require('mysql');
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







router.get('/home/constat',(req,res,next)=>{
  if(req.cookies.infoAgent){
    res.render("ordre/sinistres/constat", {host:req.hostname,infoAgent:req.cookies.infoAgent, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionAgent")
   }
});


router.get('/home', function(req, res, next) {

if(req.cookies.infoAgent){
  con.connect(()=>{

    console.log(req.cookies.infoAgent)
    let temps = new Date()
    let sql  = "select * from sinistrevoldetails where niveau = ? and constat =?"
    con.query(sql,["O/E","oui"],(err,result,fields)=>{
      fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
     
      let sql  = "select * from sinistreidetails where niveau = ? and constat =?"
      con.query(sql,["O/E","oui"],(err,resulti,fields)=>{

        let sql  = "select * from sinistrebdgdetails where niveau = ? and constat =?"
      con.query(sql,["O/E","oui"],(err,resultbdg,fields)=>{
res.render('ordre/sinistres/', { title: 'Express',blocks:body,sinistreV:resulti,sinistreb:resultbdg, sinistres:result, infoAgent:req.cookies.infoAgent})
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


router.get('/sendConstat/:numpolice', function(req, res, next) {

if(req.cookies.infoAgent){
  
res.render('ordre/form', { title: 'SIIN',numero_police:req.params.numpolice,infoAgent:req.cookies.infoAgent})
}
  //si la variable existe retourner la vue dashboard
	else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}

});




router.post('/sendConstat/send',(req,res,next)=>{
  console.log(req.body.constat)
    con.connect(()=>{
    let temps = new Date()
    let sql  = "insert into avis_police(nom, prenoms, num_police, immatriculation, localisation, avis, date_envoi) values (?,?,?,?,?,?,?)"
    con.query(sql,[req.body.nom,req.body.prenom,req.body.num_police,req.body.immatriculation,req.body.localisation,req.body.avis,temps],(err,result,fields)=>{
      res.redirect("/ordre/home")
    })
    })
    
   
})

router.get('/deconnexion', function(req, res, next) {
  //supprimer la variable cookie user
  res.clearCookie("infoAgent")
  //retourne la vue connexion
  res.redirect("/connexionAgent")
});




module.exports = router;