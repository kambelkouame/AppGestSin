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

/* GET home page. */
router.get('/', function(req, res, next) {

fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => res.render('index', { title: 'Express', body:body }));
   
 ;
});


router.get('/connexionUser', function(req, res, next) {
res.render('connexionUser', { title: 'Express'})
});

router.get('/connexionAgent', function(req, res, next) {
res.render('connexionAgent', { title: 'Express'})
});

router.get('/deconnexion', function(req, res, next) {
	//supprimer la variable cookie user
	res.clearCookie("user")
	//retourne la vue connexion
	res.redirect("/connexionUser")
});

router.post("/blockInsert", (req,res)=>{
	let sql ="INSERT INTO blockDonnee  SET ? ";
   		 const donne1=req.body.donne1;
	     const donne2=req.body.donne2;
		 const donne3=req.body.donne3;
        var date = new Date();

     

        //variable d'insertion des sinistres
		
		 
		let blockDonnee = {
			donne1:donne1,
			donne2:donne2,
			donne3:donne3,
			date :date,
		   }

	console.log(blockDonnee);
       
         //connexion a la base de Donnée

		let connexion = mysql.createConnection({
		  host : db.hostname,
		  user : db.username,
		  password : db.password,
		  database : db.dbname,
		  port : db.port,
		})

 		

		//action d'insertion dans la base de donnée
		
		connexion.query(sql,blockDonnee) ,( err,result)=>{
			if(err){
				console.log(err.message)
			}
		}

		 
         //Variable contenant les données a inserer dans la blockchain

		 let blockDonee ={
		   	"sender":donne1,
		   	"receiver":donne2,
		   	"amount":donne3,

		   }

          //transformation de donneechain en format JSON

		  blockDonees=JSON.stringify(blockDonee)
		 
           //Affichage de  donnechain dans le terminal

		  console.log(blockDonees) 


		   const urls=[
		   'http://localhost:5000/transaction',
		   'http://localhost:5001/transaction'
		   ];
          let url1='http://localhost:5001/transaction';



        fetch(url1, {
        method: 'post',
        body:    blockDonees,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));

    res.redirect("/")
})

module.exports = router;