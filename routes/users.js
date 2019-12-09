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

router.get('/home', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoUser){
	//si la variable existe retourner la vue dashboard
res.render('user/home', { title: 'Express', data:req.cookies.infoUser})
}else{
	//sinon retourner connexion
	res.redirect("/connexionUser")
}
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

})
module.exports = router;
