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

var num_police 
var donnee2
var donnee1={}
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sinistre'

})



router.get('/home/sinistre/Garantie_non_acquise',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/garantie_non_acquise", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})


router.get('/home/addSinistre/:numero_police',(req,res,next)=>{
  if(req.cookies.infoUser){
      
      num_police=req.params.numero_police
    res.render("user/formPrereq", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
 
          
   }else{
    res.redirect("/connexionUser")
   }
})

/////////////////////////////chemin pour formulaire sans adversaire/////////////////////////////////////

router.get('/home/sinistres/Dc/Dommage_corporels',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/Dc/formDommage", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

//DOMMAGE MATERIEL
///////////
///////////VOL

router.get('/home/sinistres/Dm/vol',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/Dm/formVol", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

///////////Bris de glace
router.get('/home/sinistres/Dm/Bris_de_Glace',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/Dm/formBrisG", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})
///////////Incendie
router.get('/home/sinistres/Dm/Incendie',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/Dm/formIncendie", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})


//////DOMMAGE Corporel et Materiel
///////////
/////////////VOL
router.get('/home/sinistres/DmDC/vol',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/DmDC/formVol", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})
////////////Bris de glace
router.get('/home/sinistres/DmDC/Bris_de_Glace',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/DmDC/formBrisG", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

/////////Incendie
router.get('/home/sinistres/DmDC/Incendie',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/sansadversaire/DmDC/formIncendie", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

///////////////////////chemin//////////////////////////////////
///////////////////////////fin chmin avec adversaire/////////////////////////////////////////


////////DOMMAGE CORPOREL

router.get('/home/sinistres/Dc/Dommage_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/Dc/formDomAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

////////DOMMAGE MATERIEL

////VOL
router.get('/home/sinistres/Dm/vol_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/Dm/formVolAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

//// Bris de Glace
router.get('/home/sinistres/Dm/Bris_de_Glace_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/Dm/formBrisGAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})

////Incendie
router.get('/home/sinistres/Dm/Incendie_avec_adversaire',(req,res,next)=>{
  if(req.cookies.infoUser){
    res.render("user/form/adversaire/Dm/formIncendieAd", {host:req.hostname,infoUser:req.cookies.infoUser, numero_police:req.params.numero_police})
   }else{
    res.redirect("/connexionUser")
   }
})
///////////////////////////fin chmin avec adversaire/////////////////////////////////////////

router.post('/home/addSinistre/send',(req,res,next)=>{
  console.log(req.body.constat)
    

    let sql  = "INSERT INTO sinistre SET ?";
    const nom=req.body.nom;
    const prenom=req.body.prenom;
    const num_police=req.body.num_police;
    const type_sinistre=req.body.type_sinistre;
    const cat_sinistre=req.body.cat_sinistre;
    const date_sinistre=req.body.date_sinistre;
    const permis=req.body.permis;
    const carte_grise=req.body.carte_grise;
    const visite_tech=req.body.visite_tech;
    const element_prod=req.body.element_prod;
    const attestation=req.body.attestation;
    const sinistre=req.body.sinistre;
     const ID=req.body.ID;
    
      const contrat_det= req.body.contrat_det;
   
    let declaration={

        nom:nom,
        prenom:prenom,
        num_police:num_police,
        type_sinistre:type_sinistre,
        cat_sinistre:cat_sinistre,
        date_sinistre:date_sinistre,
        permis:permis,
        carte_grise:carte_grise,
        visite_tech:visite_tech,
        element_prod:element_prod,
        attestation:attestation,
        sinistre:sinistre,

    }

  console.log(declaration)

  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })



  connexion.query(sql,declaration) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }

     //redirection cas sinstre avec  adversaire
    if ( type_sinistre =="SAA"){
          if( cat_sinistre =="DC"){

             res.redirect("/users/home/sinistres/Dc/Dommage_corporels_avec_adversaire")

          }else if(cat_sinistre=="DM"){
            if ( sinistre=="VOL"){
               res.redirect("/users/home/sinistres/Dm/vol_avec_adversaire")
            }else if (sinistre=="BDG"){
              res.redirect("/users/home/sinistres/Dm/Bris_de_Glace_avec_adversaire")

            }else if (sinistre=="I"){
              res.redirect("/users/home/sinistres/Dm/Incendie_avec_adversaire")
            }
          }else if ( cat_sinistre =="DM/DC"){
            
            if ( sinistre=="VOL"){
               res.redirect("/users/home/sinistres/DmDc/vol_avec_adversaire")
            }else if (sinistre=="BDG"){
              res.redirect("/users/home/sinistres/DmDc/Bris_de_Glace_avec_adversaire")

            }else if (sinistre=="I"){
              res.redirect("/users/home/sinistres/DmDc/Incendie_avec_adversaire")

            }

          }

          //redirection cas sinstre sans adversaire
    }else if(type_sinistre == "SSA"){
                //cas de la selection du dommage corporel
       if( cat_sinistre =="DC"){
                    res.redirect("/users/home/sinistres/Dc/Dommage_corporels")
          }else if(cat_sinistre=="DM"){

                if ( sinistre=="VOL"){     
                 res.redirect("/users/home/sinistres/Dm/vol")
            }else if (sinistre=="BDG"){
              res.redirect("/users/home/sinistres/Dm/Bris_de_Glace")

            }else if (sinistre=="I"){
              res.redirect("/users/home/sinistres/Dm/Incendie")
            }
        
          }else if( cat_sinistre =="DM/DC"){


             if ( sinistre=="VOL"){     
                 res.redirect("/users/home/sinistres/DmDc/vol")
            }else if (sinistre=="BDG"){
              res.redirect("/users/home/sinistres/DmDc/Bris_de_Glace")

            }else if (sinistre=="I"){
              res.redirect("/users/home/sinistres/DmDc/Incendie")

            }
          }else{
             res.redirect("/users/home/addSinistre/:numero_police")

          }



    }else{
     res.redirect("/users/home/addSinistre/:numero_police")

    
  }
  });
//////////////////////DOMMAGE MATERIEL
///////////////////////////////////VOL
router.post('/home/sinistres/Dm/dmvsend',(req,res,next)=>{

    let sql  = "INSERT INTO sinistrevoldetails SET ?";
    
    const Localisation=req.body.Localisation;
    const type_vol=req.body.type_vol;
    const nom_temoin=req.body.nom_temoin;
    const telephone_temoin=req.body.telephone_temoin;
    const adresse_temoin=req.body.adresse_temoin;
    const photo_vol=req.body.photo_vol;
    const nom=req.body.nom;
    const prenom=req.body.prenom;
    const numero=req.body.numero;
    const email=req.body.email;
    const domicile=req.body.domicile;      
    const marque_vehicule=req.body.marque_vehicule;
    const genre_vehicule=req.body.genre_vehicule;
    const categorie_permis=req.body.categorie_permis;
    const Model_vehicule=req.body.Model_vehicule;
    const ville=req.body.ville;
    const energie=req.body.energie;
    const immatriculation=req.body.immatriculation;
    const date_debut_cont=req.body.date_debut_cont;
    const date_fin_cont=req.body.date_fin_cont;
    const souscripteur=req.body.souscripteur;
    const type_Garantie=req.body.type_Garantie;
    const Assurance=req.body.Assurance;
   
    let sinistrevoldetails={

        numero_police:num_police,
        Localisation:Localisation,
        type_vol:type_vol,
        nom_temoin:nom_temoin,
        adresse_temoin:adresse_temoin,
        telephone_temoin:telephone_temoin,
        photo_vol:photo_vol,
        nom:nom,
        prenom:prenom,
        numero:numero,
        email:email,
        domicile:domicile,
        marque_vehicule:marque_vehicule,
        genre_vehicule:genre_vehicule,
        categorie_permis:categorie_permis,
        Model_vehicule:Model_vehicule,
        ville:ville,
        energie:energie,
        immatriculation:immatriculation,
        date_debut_cont:date_debut_cont,
        date_fin_cont:date_fin_cont,
        souscripteur:souscripteur,
        type_Garantie:type_Garantie,
        Assurance:Assurance,
        niveau:"O/E"

    }
  console.log(sinistrevoldetails)
  console.log(num_police)

  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })

  connexion.query(sql,sinistrevoldetails) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }


     fetch('https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/voir_contrat/192?page='+req.params.page)
    .then(result => result.json())
    .then(body => {

          let result=[]
          body.data.forEach(b=>{
            if(b.numero_police==num_police) result=b
               })

          console.log(result.avenant_id)
          var ID = result.avenant_id
          var host='https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/details_contrat/'
          var url = host+ID
           fetch(url)
            .then((response) => response.json())
            .then(info =>{
              info.garanties.forEach(element=>{
                console.log(element)
                if(element.libelle==="Vol,Vol accessoires,Vol armé"){
                  
                  console.log("garantie acquise")
                  res.redirect("/users/home/contrats/1")} 
                  })
             

              if (info.garanties.libelle !=="Vol,Vol accessoires,Vol armé"){
                  console.log("garantie non acquise")
                  
                 res.redirect("/users/home/sinistre/Garantie_non_acquise/")
                } 
                 
              })
          })
      
        
  });


///////////////////////BRIS DE GLACE
  router.post('/home/sinistres/Dm/dmbsend',(req,res,next)=>{

    let sql  = "INSERT INTO sinistrebdgdetails SET ?";
    
  
    const Localisation=req.body.Localisation;
    const type_vol=req.body.type_vol;
    const nom_temoin=req.body.nom_temoin;
    const telephone_temoin=req.body.telephone_temoin;
    const adresse_temoin=req.body.adresse_temoin;
    const photo_vol=req.body.photo_vol;
    const nom=req.body.nom;
    const prenom=req.body.prenom;
    const numero=req.body.numero;
    const email=req.body.email;
    const domicile=req.body.domicile;      
    const marque_vehicule=req.body.marque_vehicule;
    const genre_vehicule=req.body.genre_vehicule;
    const categorie_permis=req.body.categorie_permis;
    const Model_vehicule=req.body.Model_vehicule;
    const ville=req.body.ville;
    const energie=req.body.energie;
    const immatriculation=req.body.immatriculation;
    const date_debut_cont=req.body.date_debut_cont;
    const date_fin_cont=req.body.date_fin_cont;
    const souscripteur=req.body.souscripteur;
    const type_Garantie=req.body.type_Garantie;
    const Assurance=req.body.Assurance;
   
    let sinistrevoldetails={

        numero_police:num_police,
        Localisation:Localisation,
        type_vol:type_vol,
        nom_temoin:nom_temoin,
        adresse_temoin:adresse_temoin,
        telephone_temoin:telephone_temoin,
        photo_vol:photo_vol,
        nom:nom,
        prenom:prenom,
        numero:numero,
        email:email,
        domicile:domicile,
        marque_vehicule:marque_vehicule,
        genre_vehicule:genre_vehicule,
        categorie_permis:categorie_permis,
        Model_vehicule:Model_vehicule,
        ville:ville,
        energie:energie,
        immatriculation:immatriculation,
        date_debut_cont:date_debut_cont,
        date_fin_cont:date_fin_cont,
        souscripteur:souscripteur,
        type_Garantie:type_Garantie,
        Assurance:Assurance,
        niveau:"O/E"

    }
  console.log(sinistrevoldetails)
  console.log(num_police)

  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })

  connexion.query(sql,sinistrevoldetails) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }


     fetch('https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/voir_contrat/192?page='+req.params.page)
    .then(result => result.json())
    .then(body => {

          let result=[]
          body.data.forEach(b=>{
            if(b.numero_police==num_police) result=b
               })

          console.log(result.avenant_id)
          var ID = result.avenant_id
          var host='https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/details_contrat/'
          var url = host+ID
           fetch(url)
            .then((response) => response.json())
            .then(info =>{
              info.garanties.forEach(element=>{
                console.log(element)
                if(element.libelle==="Vol,Vol accessoires,Vol armé"){
                  
                  console.log("garantie acquise")
                  res.redirect("/users/home/contrats/1")} 
                  })
             

              if (info.garanties.libelle !=="Vol,Vol accessoires,Vol armé"){
                  console.log("garantie non acquise")
                  
                 res.redirect("/users/home/sinistre/Garantie_non_acquise/")
                } 
                 
              })
          })
});


///////////////////////BRIS DE GLACE
  router.post('/home/sinistres/Dm/dmIsend',(req,res,next)=>{

    let sql  = "INSERT INTO sinistreIdetails SET ?";
    
  
    const Localisation=req.body.Localisation;
    const type_vol=req.body.type_vol;
    const nom_temoin=req.body.nom_temoin;
    const telephone_temoin=req.body.telephone_temoin;
    const adresse_temoin=req.body.adresse_temoin;
    const photo_vol=req.body.photo_vol;
    const nom=req.body.nom;
    const prenom=req.body.prenom;
    const numero=req.body.numero;
    const email=req.body.email;
    const domicile=req.body.domicile;      
    const marque_vehicule=req.body.marque_vehicule;
    const genre_vehicule=req.body.genre_vehicule;
    const categorie_permis=req.body.categorie_permis;
    const Model_vehicule=req.body.Model_vehicule;
    const ville=req.body.ville;
    const energie=req.body.energie;
    const immatriculation=req.body.immatriculation;
    const date_debut_cont=req.body.date_debut_cont;
    const date_fin_cont=req.body.date_fin_cont;
    const souscripteur=req.body.souscripteur;
    const type_Garantie=req.body.type_Garantie;
    const Assurance=req.body.Assurance;
   
    let sinistrevoldetails={

        numero_police:num_police,
        Localisation:Localisation,
        type_vol:type_vol,
        nom_temoin:nom_temoin,
        adresse_temoin:adresse_temoin,
        telephone_temoin:telephone_temoin,
        photo_vol:photo_vol,
        nom:nom,
        prenom:prenom,
        numero:numero,
        email:email,
        domicile:domicile,
        marque_vehicule:marque_vehicule,
        genre_vehicule:genre_vehicule,
        categorie_permis:categorie_permis,
        Model_vehicule:Model_vehicule,
        ville:ville,
        energie:energie,
        immatriculation:immatriculation,
        date_debut_cont:date_debut_cont,
        date_fin_cont:date_fin_cont,
        souscripteur:souscripteur,
        type_Garantie:type_Garantie,
        Assurance:Assurance,
        niveau:"O/E"

    }
  console.log(sinistrevoldetails)
  console.log(num_police)

  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })

  connexion.query(sql,sinistrevoldetails) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }


     fetch('https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/voir_contrat/192?page='+req.params.page)
    .then(result => result.json())
    .then(body => {

          let result=[]
          body.data.forEach(b=>{
            if(b.numero_police==num_police) result=b
               })

          console.log(result.avenant_id)
          var ID = result.avenant_id
          var host='https://api-auto-siin.eu-gb.mybluemix.net/auto-siin/details_contrat/'
          var url = host+ID
           fetch(url)
            .then((response) => response.json())
            .then(info =>{
              info.garanties.forEach(element=>{
                console.log(element)
                if(element.libelle==="Vol,Vol accessoires,Vol armé"){
                  
                  console.log("garantie acquise")
                  res.redirect("/users/home/contrats/1")} 
                  })
             

              if (info.garanties.libelle !=="Vol,Vol accessoires,Vol armé"){
                  console.log("garantie non acquise")
                  
                 res.redirect("/users/home/sinistre/Garantie_non_acquise/")
                } 
                 
              })
          })
});

/*
///////////////////////////////////formulaire INCENDIE//////////////
router.post('/home/sinistres/Incendie/send',(req,res,next)=>{
  console.log(req.body.constat)
    
    let sql  = "INSERT INTO sinistredetails SET ?";
    
    const num_police=req.body.num_police;
    const Localisation=req.body.Localisation;
    const Vol_accessoire=req.body.vol_accessoire;
    const vol_complet=req.body.vol_complet;
    const nom_temoin=req.body.nom_temoin;
    const telephone_temoin=req.body.telephone_temoin;
    const contact_temoin=req.body.contact_temoin;
    const photo_vol=req.body.photo_vol;
    const marque_vehicule=req.body.marque_vehicule;
    const genre_vehicule=req.body.genre_vehicule;
    const categorie_permis=req.body.categorie_permis;
    const Model_vehicule=req.body.Model_vehicule;
    const ville=req.body.ville;
    const energie=req.body.energie;
    const immatriculation=req.body.immatriculation;
    const date_debut_cont=req.body.date_debut_cont;
    const date_fin_cont=req.body.date_fin_cont;
    const souscripteur=req.body.souscripteur;
    const type_de_garantie=req.body.type_de_garantie;
    const Assurance=req.body.Assurance;
   
    let declarationdetails={
        num_police:num_police,
        Localisation:Localisation,
        Vol_accessoire:vol_accessoire,
        vol_complet:vol_complet,
        nom_temoin:nom_temoin,
        telephone_temoin:telephone_temoin,
        contact_temoin:contact_temoin,
        photo_vol:photo_vol,
        marque_vehicule:marque_vehicule,
        genre_vehicule:genre_vehicule,
        categorie_permis:categorie_permis,
        Model_vehicule:Model_vehicule,
        ville:ville,
        energie:energie,
        immatriculation:immatriculation,
        date_debut_cont:date_debut_cont,
        date_fin_cont:date_fin_cont,
        souscripteur:souscripteur,
        type_de_garantie:type_de_garantie,
        Assurance:Assurance,
    }
  console.log(declarationdetails)
  let connexion = mysql.createConnection({
      host : db.hostname,
      user : db.username,
      password : db.password,
      database : db.dbname,
      port : db.port,
    })
  connexion.query(sql,declarationdetails) ,( err,result)=>{
      if(err){
        console.log(err.message)
      }
    }
     res.redirect("/home/contrats/1")
    
  });
*/
    
   

//User directory
router.get('/home/sinistres', function(req, res, next) {

//verification de l'existence de la variable cookie 'user'
if(req.cookies.infoUser){
  con.connect(()=>{
    let temps = new Date()
    let sql  = "select * from sinistrevoldetails where nom = ? and prenom = ?"
    let sql2  = "select * from sinistre where nom = ? and prenom = ?"
    con.query(sql,[req.cookies.infoUser.client.nom,req.cookies.infoUser.client.prenom],(err,result,fields)=>{
      con.query(sql2,[req.cookies.infoUser.client.nom,req.cookies.infoUser.client.prenom],(err,result2,fields)=>{
     fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {
res.render('user/sinistres/', { title: 'Express',blocks:body,sinistres2:result2, sinistres:result, data:req.cookies.infoUser})
})
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
      res.render('user/contrats/', { title: 'SIIN',blocks:body, contrats:contratValide, data:req.cookies.infoUser})
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
     //console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){

         console.log('zooooo')
        //creation de la variable cookie
        
         
        if(results[0].fonction=="gestionnaire"){
          res.cookie("infoAgent", results[0])
          console.log(results[0])
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