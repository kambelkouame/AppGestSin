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
var blocks = require('../functions/blockChain')
var db= require('../database/db');

app.use(cookieParser())


//User directory

router.get('/home', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoUser){
	//si la variable existe retourner la vue dashboard
	fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => res.render('user/home', { title: 'Express',blocks:body, data:req.cookies.infoUser}));

}else{
	//sinon retourner connexion
	res.redirect("/connexionUser")
}
});

router.get('/deconnexion', function(req, res, next) {
	//supprimer la variable cookie user
	res.clearCookie("infoUser")
	//retourne la vue connexion
	res.redirect("/connexionUser")
});

router.post("/loginUser", function(req, res){
 
  	email= req.body.email,
  	password= req.body.password
 


 let user ={
   	email:email,
   	password:password,
   }

  user = JSON.stringify(user)
console.log(user)
  let url = "https://api-master-siin.eu-gb.mybluemix.net/master-siin/auth/login"

  fetch(url, {
        method: 'post',
        body:    user,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json =>{
    	if(json.error){
    		console.log("erreur")
    	}else{
    		res.cookie("infoUser",json)
    		res.redirect("/users/home")
    	}
    })

});


///////////////////////////////Agent Directory///////////////////////////////////////////////////////////////////


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


router.get('/ordre/home', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoAgent){
  //si la variable existe retourner la vue dashboard
  fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => res.render('ordre/home', { title: 'Express',blocks:body, data:req.cookies.infoAgent}));

}else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}
});


router.get('/second/home', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoAgent){
  //si la variable existe retourner la vue dashboard
  fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => res.render('second/home', { title: 'Express',blocks:body, data:req.cookies.infoAgent}));

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


router.post("/loginAgent", function(req, res){
 
  	email= req.body.email,
  	password= req.body.password
 
let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    });

connexion.query('SELECT * FROM agent WHERE email = ?',[email], function (error, results, fields) {

  if (error) {
   res.redirect('/connexionAgent')
    // console.log("error ocurred",error);
   
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){

         console.log('faux')
      	//creation de la variable cookie
      	res.cookie("infoAgent", true)

        if(results[0].fonction== "gestionnaire"){

          res.redirect('/users/agent/home')
        } 
        else if (results[0].fonction=="policier"){

         res.redirect('/users/ordre/home')
        }
         else if (results[0].fonction=="expert"){
         
          for (var i = 0; i < rows.length; i++) {
      result = rows;
                }

         res.redirect('/users/second/home')
        }
        else{
          res.redirect('/connexionAgent')
        }
      	//retour a la vue user  
      }
      else{
       res.redirect('/connexionAgent')
        
      }
    }
    else{
    	res.redirect('/connexionAgent')
    }
  }

})

})

module.exports = router;
