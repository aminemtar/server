


import user from '../models/user.js';
import match from '../models/Match.js';
import outfit from '../models/outfit.js';
import session from 'express-session';






export async function Swipeleft(req, res) {
      
        let Match = {
          IdSession: req.session.user._id,
          IdReciver: req.params.IdReciver,
          IdOutfitR: req.body.IdOutfitR, 
           
  
        }
     
        match
          .create(Match)
          .then(Trade => {
            res.status(200).json(Trade);
          })
          user
          .findOneAndUpdate({"_id":req.session.user._id },{
              $push: {
                  swiped: req.body.IdOutfitR
              }, 
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });     
   
  }
  export function AddOutfitR(req, res) {

    match  
      .updateMany({ "IdReciver": req.params.IdReciver , "IdSession": req.session.user._id },  {
        $push: {
            IdOutfitR :req.body.IdOutfitR
            
        }, 
        $set:{
          Etat :true
        }      
    })
    .then(docs => {
        res.status(200).json(docs);
        console.log("creating below")
            console.log(docs)
      
    
        
    })
    user
    .findOneAndUpdate({"_id":req.session.user._id },{
        $push: {
            swiped: req.body.IdOutfit
        }, 
    })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
  export function verifyexistingmatch(req, res) {

    match  
      .updateMany({ "IdSession": req.params.IdReciver , "IdReciver": req.session.user._id },  {
        $push: {
            IdOutfit: req.body.IdOutfit,
            
        }, 
        $set:{
          Etat :true
        }      
    })
    .then(docs => {
        console.log(docs)
      let  newdoc = {docs , firebase : 1, userID : req.session.user._id}
        res.status(200).json(newdoc)
      
        console.log("creating 222222 below")
        console.log(newdoc)
  
    
        
    })
    user
    .findOneAndUpdate({"_id":req.session.user._id },{
        $push: {
            swiped: req.body.IdOutfit
        }, 
    })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
  export function swipe (req,res)
  {
    match.find({ "IdSession": req.params.IdReciver , IdReciver: req.session.user._id })
    .then(doc =>{
      console.log(doc)
      if (doc.length === 0)
      {
        console.log("------ffffff-------")

        match.find({ "IdSession": req.session.user._id , IdReciver: req.params.IdReciver })
        .then(doc => {
          console.log("------qqqqq-------")
          console.log(doc)
          console.log("------qqqqq-------")

           if (doc.length === 0){
                 Swipeleft(req,res)
           }else {
              AddOutfitR(req, res)    
                     }
        })
       
      }else{
        verifyexistingmatch(req, res)
      }
    })
   
  }

  // export function swipedclothes(req,res){
  //   match.find({ IdSession: req.session.user._id, "IdReciver": req.params.IdReciver })
  //   .then(docs => {
  //     res.status(200).json(docs);
  //     if(d.IdSession === req.session.user._id)
  //     {
  //       outfit.find({"_id": docs })
  //       res.send(docs);
  //     }
  //     else if(docs.IdReciver=== req.session.user._id)
  //     {
  //       outfit.find({"_id": docs })
  //       res.status(200).json(docs);
  //     }
    
  
      
  // })

  // }