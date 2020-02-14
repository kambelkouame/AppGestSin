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
var cookieParser = require('cookie-parser');
var multer = require('multer');
const path = require('path');
var db= require('../database/db');
app.use(cookieParser());



const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sinistre'

});


var image;
var numero_police;
var nom_Policier;
var prenom_Policier;

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/expertise/',
  filename: function(req, file, cb){
    var name="expertise" + '-' + Date.now() + path.extname(file.originalname);
    cb(null,name);
    image=name;
  }

});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|pdf|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mimewww
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.get('/home/effectue',(req,res,next)=>{
  if(req.cookies.infoExpert){
  let sql  = "select * from expertise where nomAgent =? and prenomAgent =?"
   con.query(sql,[req.cookies.infoExpert.nom,req.cookies.infoExpert.prenom],(err,result,fields)=>{
 console.log(result)
    res.render("ordre/effectue/index", {host:req.hostname,infoExpert:req.cookies.infoExpert, sinistres:result, numero_police:req.params.numero_police})
  })
   }else{
    res.redirect("/connexionAgent")
   }
});



router.get('/home/expertise/:numero_police',(req,res,next)=>{
  if(req.cookies.infoExpert){

     numero_police=req.params.numero_police
    nom_Policier=req.cookies.infoOrdre.nom
    prenom_Policier=req.cookies.infoOrdre.prenom
    res.render("second/sinistres/expertise", {host:req.hostname,infoExpert:req.cookies.infoExpert, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionAgent")
   }
});

router.get('/home', function(req, res, next) {

if(req.cookies.infoExpert){
  con.connect(()=>{

    console.log(req.cookies.infoExpert)
    let temps = new Date()
    let sql  = "select * from sinistrevoldetails where constatAgent = ?"
    con.query(sql,["abs"],(err,result,fields)=>{
      fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
     
     

  
res.render('second/sinistres/', { title: 'SIIN',blocks:body, sinistres:result, infoExpert:req.cookies.infoExpert})
})
    })
    })
  
  //si la variable existe retourner la vue dashboard
      
}else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}
});



router.post('/home/expertise/send', function(req, res, next) {

if(req.cookies.infoExpert){
console.log(req.cookies.infoExpert)
  upload(req, res, (err) => {
    if(err){
      res.render('second/sinistres/constat', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('second/sinistres/constat', {
          msg: 'Error: vous n avez pas selectionné de fichier!'
        });
      } else {

    let sql  = "INSERT INTO expertise SET ?";
     let sql2 ='UPDATE sinistrevoldetails SET expertAgent =? WHERE numero_police =?' 
  
   // const culpabilite=req.body.culpabilite;
     const estimation=req.body.estimation;
    
  
    var date = new Date()
    console.log(date)
    let constat={

      //  culpabilite:culpabilite,
        uploaded_image:image,
        nomAgent:req.cookies.infoExpert.nom,
        prenomAgent:req.cookies.infoExpert.prenom,
        numero_police:numero_police,
        estimation:estimation,
        date_declaration:date
       

    }
  console.log(constat)
  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })

  connexion.query(sql,constat) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }

      connexion.query(sql2,['ok',numero_police]) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }
   res.redirect('../effectue')
/*  res.render('ordre/effectue/index', { title: 'SIIN',numero_police:req.params.numpolice,infoOrdre:req.cookies.infoOrdre,msg: 'sdkjhlmkjlmh!',
          file: `uploads/${req.file.filename}`
        });*/
        /*res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });*/
      }
    }
  });
}
  //si la variable existe retourner la vue dashboard
  else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}

});


router.get('/sendConstat/:numpolice', function(req, res, next) {

if(req.cookies.infoExpert){
  
res.render('second/form', { title: 'SIIN',numero_police:req.params.numpolice,infoExpert:req.cookies.infoExpert})
}
  //si la variable existe retourner la vue dashboard
	else{
  //sinon retourner connexion
  res.redirect("/connexionAgent")
}

});






router.get('/deconnexion', function(req, res, next) {
  //supprimer la variable cookie user
  res.clearCookie("infoExpert")
  //retourne la vue connexion
  res.redirect("/connexionAgent")
});




module.exports = router;