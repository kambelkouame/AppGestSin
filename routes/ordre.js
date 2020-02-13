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
var multer = require('multer');
const path = require('path');
var db= require('../database/db');
app.use(cookieParser())


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
  destination: './public/uploads/',
  filename: function(req, file, cb){
    var name="constat" + '-' + Date.now() + path.extname(file.originalname);
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

  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}





router.get('/home/effectue',(req,res,next)=>{
  if(req.cookies.infoOrdre){
  let sql  = "select * from constat where nomAgent =? and prenomAgent =?"
   con.query(sql,[req.cookies.infoOrdre.nom,req.cookies.infoOrdre.prenom],(err,result,fields)=>{
 console.log(result)
    res.render("ordre/effectue/index", {host:req.hostname,infoOrdre:req.cookies.infoOrdre, sinistres:result, numero_police:req.params.numero_police})
  })
   }else{
    res.redirect("/connexionAgent")
   }
});

router.get('/home/constat/:numero_police',(req,res,next)=>{
  if(req.cookies.infoOrdre){
 
    numero_police=req.params.numero_police
    nom_Policier=req.cookies.infoOrdre.nom
    prenom_Policier=req.cookies.infoOrdre.prenom
    res.render("ordre/sinistres/constat", {host:req.hostname,infoOrdre:req.cookies.infoOrdre,numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionAgent")
   }
});


router.get('/home/constat/tab',(req,res,next)=>{
  if(req.cookies.infoOrdre){
    res.render("ordre/accueil/index", { title: '< | > | Accueil', error: "", logo: "< | >", host:req.hostname,infoOrdre:req.cookies.infoOrdre, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionAgent")
   }
});


router.get('/home', function(req, res, next) {

if(req.cookies.infoOrdre){
  con.connect(()=>{

    console.log(req.cookies.infoOrdre)
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
res.render('ordre/sinistres/', { title: 'Express',blocks:body,sinistreV:resulti,sinistreb:resultbdg, sinistres:result, infoOrdre:req.cookies.infoOrdre})
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


router.post('/home/constat/send', function(req, res, next) {

if(req.cookies.infoOrdre){
console.log(req.cookies.infoOrdre)
  upload(req, res, (err) => {
    if(err){
      res.render('ordre/sinistres/constat', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('ordre/sinistres/constat', {
          msg: 'Error: vous n avez pas selectionné de fichier!'
        });
      } else {

    let sql  = "INSERT INTO constat SET ?";
    
  
    const culpabilite=req.body.culpabilite;
    
  
    var date = new Date()
    console.log(date)
    let constat={

        culpabilite:culpabilite,
        uploaded_image:image,
        nomAgent:req.cookies.infoOrdre.nom,
        prenomAgent:req.cookies.infoOrdre.prenom,
        numero_police:numero_police,
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


/*
router.post('/sendConstat/send',(req,res,next)=>{
  console.log(req.body.constat)
    con.connect(()=>{
    let temps = new Date()
    let sql  = "insert into avis_police(nom, prenoms, num_police, immatriculation, localisation, avis, date_envoi) values (?,?,?,?,?,?,?)"
    con.query(sql,[req.body.nom,req.body.prenom,req.body.num_police,req.body.immatriculation,req.body.localisation,req.body.avis,temps],(err,result,fields)=>{
      res.redirect("/ordre/home")
    })
    })
    
   
});*/

router.get('/deconnexion', function(req, res, next) {
  //supprimer la variable cookie user
  res.clearCookie("infoOrdre")
  //retourne la vue connexion
  res.redirect("/connexionAgent")
});




module.exports = router;