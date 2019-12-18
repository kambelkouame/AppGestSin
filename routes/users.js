var express = require('express');
var body = require("body-parser");
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
var app = require('express')()


app.use(body.json()); // for parsing application/json
app.use(body.urlencoded({ extended: true }));



const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sinistre'

})


router.get('/home/addSinistre/:numero_police',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/formPrereq", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

/////////////////////////////chemin pour formulaire sans adversaire/////////////////////////////////////

router.get('/home/sinistres/Dommage_corporels',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/formDommage", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

router.get('/home/sinistres/vol',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/formVol", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

router.get('/home/sinistres/Bris_de_Glace',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/formBrisG", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

router.get('/home/sinistres/Incendie',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/formIncendie", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

///////////////////////chemin//////////////////////////////////

router.get('/home/sinistres/Dommage_corporels_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/formDomAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

router.get('/home/sinistres/vol_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/formVolAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

router.get('/home/sinistres/Bris_de_Glace_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/formBrisGAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

router.get('/home/sinistres/Incendie_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/formIncendie", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})
///////////////////////////fin chmin avec adversaire/////////////////////////////////////////

router.post('/home/addSinistre/send',(req,res,next)=>{
  console.log(req.body.constat)
    con.connect(()=>{
    let temps = new Date()
    let sql  = "insert into sinistre(nom, prenom, num_police, type_sinistre, cat_sinistre, date_sinistre, permis, ,carte_grise, visite_tech, element_prod, attestation, sinistre) values (?,?,?,?,?,?,?,?,?,?,?,?)"
    con.query(sql,[req.body.nom,req.body.prenom,req.body.num_police,temps,req.body.type_sinistre,req.body.cat_sinistre,req.body.permis,req.body.cate_grise,req.body.viste_tech,req.body.element_prod,req.body.attestation, req.body.sinistre],(err,result,fields)=>{

    if( req.body.type_sinistre =="SAA"){
          if( req.body.cat_sinistre =="DC"){
             res.redirect("/users/home/sinistres/Dommage_corporels_avec_adversaire")
          }else if(req.body.cat_sinistre=="DM" || req.body.cat_sinistre=="DM/DC"){
            if ( req.body.sinistre=="VOL"){
               res.redirect("/users/home/sinistres/vol_avec_adversaire")
            }else if (req.body.sinistre=="BDG"){
              res.redirect("/users/home/sinistres/Bris_de_Glace_avec_adversaire")

            }else if (req.body.sinistre=="I"){
              res.redirect("/users/home/sinistres/Incendie_avec_adversaire")

            }else if (req.body.sinistre=="I"){
              res.redirect("/users/home/sinistres/Incendie_avec_adversaire")

            }else if (req.body.sinistre=="D"){
              res.redirect("/users/home/sinistres/Dommage_avec_adversaire")
            }
          }
    }else if(req.body.type_sinistre == "SSA"){

       if( req.body.cat_sinistre =="DC"){
             res.redirect("/users/home/sinistres/Dommage_corporels")
          }else if(req.body.cat_sinistre=="DM"|| req.body.cat_sinistre=="DM/DC"){
            if ( req.body.sinistre=="VOL"){
               res.redirect("/users/home/sinistres/vol")
            }else if (req.body.sinistre=="BDG"){
              res.redirect("/users/home/sinistres/Bris_de_Glace")

            }else if (req.body.sinistre=="I"){
              res.redirect("/users/home/sinistres/Incendie")

            }else if (req.body.sinistre=="I"){
              res.redirect("/users/home/sinistres/Incendie")

            }else if (req.body.sinistre=="D"){
              res.redirect("/users/home/sinistres/Dommage")
            }
          }



    }else{
     res.redirect("/home/addSinistre/:numero_police")

    }

    })
  })

  });

    
   

//User directory
router.get('/home/sinistres', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoUser){
  con.connect(()=>{
    let temps = new Date()
    let sql  = "select * from declaration_2 where nom = ? and prenoms = ?"
    con.query(sql,[req.cookies.infoUser.client.nom,req.cookies.infoUser.client.prenom],(err,result,fields)=>{
      fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
res.render('user/sinistres/', { title: 'Express',blocks:body, sinistres:result, data:req.cookies.infoUser})
})
    })
    })
  //si la variable existe retourner la vue dashboard
      
}else{
  //sinon retourner connexion
  res.redirect("/connexionUser")
}
});


router.get('/home/contrats/:page', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoUser){
	//si la variable existe retourner la vue dashboard
	fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
      fetch('https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/voir_contrat/192?page='+req.params.page)
    .then(result => result.json())
    .then(c => {
      let contratValide = c
      contrat = c.data
      contratValide.data = []

      contrat.forEach((cont)=>{
        let dateCont = new Date(cont.date_fin)
        let dateActuel = new Date()
        if(dateActuel < dateCont && cont.etat == 1){
          contratValide.data.push(cont)
        }
      })
      res.render('user/contrats/', { title: 'Express',blocks:body, contrats:contratValide, data:req.cookies.infoUser})
    })
     });

}else{
	//sinon retourner connexion
	res.redirect("/connexionUser")
}
});

router.get('/addDeclaration', function(req, res, next) {
 if(req.cookies.infoUser){
  res.render('user/form')
 }else{
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
    		res.redirect("/users/home/contrats/1")
    	}
    })

});


///////////////////////////////Agent Directory///////////////////////////////////////////////////////////////////






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
      	

        if(results[0].fonction== "gestionnaire"){
          res.cookie("infoAgent", results[0])
          res.redirect('/agent/home')
        } 
        else if (results[0].fonction=="policier"){
          res.cookie("infoAgent", results[0])
         res.redirect('/ordre/home')
        }
         else if (results[0].fonction=="expert"){
         

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
