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

router.get('/', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.user){
	//si la variable existe retourner la vue dashboard
res.render('user/home', { title: 'Express'})
}else{
	//sinon retourner connexion
	res.redirect("/connexionUser")
}
});

router.post("/loginUser", function(req, res){
  var email= req.body.email;
  var password = req.body.password;

  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })

console.log(email);
console.log(password);

  connexion.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
   res.redirect('/connexionUser')
    // console.log("error ocurred",error);
   
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
      	//creation de la variable cookie
      	res.cookie("user", true)
      	//retour a la vue user
		res.redirect('/user')
        
      }
      else{
       res.redirect('/connexionUser')
        
      }
    }
    else{
    	res.redirect('/connexionUser')
    }
  }
  });
})
module.exports = router;
