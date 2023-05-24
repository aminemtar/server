


import user from '../models/user.js';
import match from '../models/Match.js';
import outfit from '../models/outfit.js';
import session from 'express-session';






// export async function Swipeleft(req, res) {
      
//         let Match = {
//           IdSession: req.session.user._id,
//           IdReciver: req.params.IdReciver,
//           IdOutfitR: req.body.IdOutfitR, 
            
//         }
//         console.log(req.body.IdOutfitR)

     
//         match
//           .create(Match)
//           .then(Trade => {
//             res.status(200).json(Trade);
//           })
//           user
//           .findOneAndUpdate({"_id":req.session.user._id },{
//               $push: {
//                   swiped: req.body.IdOutfitR,
//               }, 
//           })
//           .catch(err => {
//             res.status(500).json({ error: err });
//           });     
   
//   }
//   export function AddOutfitR(req, res) {

//     match.updateMany({ "IdReciver": req.params.IdReciver , "IdSession": req.session.user._id},  {
//       $push: {
//         IdOutfitR: req.body.IdOutfitR
//       }
//     })
//     .then(docs => {
//       user.findOneAndUpdate({"_id":req.params.id},{
//         $push: {
//           swiped: req.body.IdOutfit
//         }, 
//       })
//       .then(() => {
//         res.status(200).json(docs);
//       })
//       .catch(err => {
//         res.status(500).json({ error: err });
//       });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
//   }
//   export function verifyexistingmatch(req, res) {

//     match  
//       .updateMany({ "IdSession": req.params.IdReciver , "IdReciver": req.session.user._id },  {
//         $push: {
//             IdOutfit: req.body.IdOutfit,
            
//         }, 
//         $set:{
//           Etat :true
//         }      
//     })
//     .then(docs => {
//         console.log(docs)
//       let  newdoc = {docs , firebase : 1, userID : req.session.user._id}
//         res.status(200).json(newdoc)
      
//         console.log("creating 222222 below")
//         console.log(newdoc)        
//     })
//     user
//     .findOneAndUpdate({"_id":req.session.user._id},{
//         $push: {
//             swiped: req.body.IdOutfit
//         }, 
//     })
//       .catch(err => {
//         res.status(500).json({ error: err });
//       });
//   }
//   export function swipe (req,res)
//   {
//     console.log(req.params.IdReciver )
//     match.find({ "IdSession": req.params.IdReciver , IdReciver: req.session.user._id})
//     .then(doc =>{
//       console.log(doc)
//       if (doc.length === 0)
//       {
//         console.log("------ffffff-------")

//         match.find({ "IdSession": req.session.user._id , IdReciver: req.params.IdReciver })
//         .then(doc => {
//           console.log("------qqqqq-------")
//           console.log(doc)
//           console.log("------qqqqq-------")

//            if (doc.length === 0){
//                  Swipeleft(req,res)
//            }else {
//               AddOutfitR(req, res)    
//                      }
//         })
       
//       }else{
//         verifyexistingmatch(req, res)
//       }
//     })
   
//   }
async function verifyExistingMatch(req, res, existingMatch) {
  try {
    const { IdOutfitR } = req.body;
    

    // Verify the existing match
    existingMatch.Etat = true;
    existingMatch.IdOutfit.push(IdOutfitR);
    await existingMatch.save();

    // Add the outfit to the user's matches
    await user.findOneAndUpdate(
      { _id: req.session.user._id },
      {
        $push: {
          swiped: req.body.IdOutfitR,
        },
      }
    );

    res.status(200).json({ message: "Match verified and outfit added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

async function addOutfitR(req, res, otherUserMatch) {
  try {
    const { IdOutfitR } = req.body;
    // Add the outfit to the match
    otherUserMatch.IdOutfitR.push(IdOutfitR);
    await otherUserMatch.save();

    // Add the outfit to the user's matches
    await user.findOneAndUpdate(
      { _id: req.session.user._id },
      {
        $push: {
          swiped: req.body.IdOutfitR
        },
      }
    );
    res.status(200).json({ message: "Outfit added to existing match" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

async function swipeLeft(req, res, IdReciver, IdOutfitR) {
  try {

    // Create a new match
    const matchData = {
      IdSession: req.session.user._id,
      IdReciver,
      IdOutfitR,
    };
    const newMatch = await match.create(matchData);

    // Add the outfit to the user's matches
    await user.findOneAndUpdate(
      { _id: req.session.user._id },
      {
        $push: {
          swiped: req.body.IdOutfitR,
        },
      }
    );

    res.status(200).json({ message: "New match created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}


export async function swipe(req, res) {
  try {
    const { IdReciver } = req.params;
    const { IdOutfitR } = req.body;

    // Check if a match already exists
    const existingMatch = await match.findOne({ IdSession: IdReciver,IdReciver: req.session.user._id });
    if (existingMatch) {
      // If a match already exists, verify it and add the outfit
      await verifyExistingMatch(req, res, existingMatch);
    } else {
      // If no match exists, check if the other user has already swiped right
      const otherUserMatch = await match.findOne({ IdSession: req.session.user._id, IdReciver: IdReciver });
      if (otherUserMatch) {
        // If the other user has already swiped right, add the outfit to the match
        await addOutfitR(req, res, otherUserMatch);
      } else {
        // If no match exists and the other user hasn't swiped right, create a new match
        await swipeLeft(req, res, IdReciver, IdOutfitR);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

  export async function matchoutfit(req,res){
    
let Match = await match.findOne({"_id":req.params.id})
console.log(Match.IdOutfitR)
if(req.session.user._id === Match.IdSession)
{
  outfit.find({_id:{$in : Match.IdOutfit}})
  .then(doc =>{
    res.status(200).json(doc)

  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
}else{
  outfit.find({_id:{$in : Match.IdOutfitR}})
  .then(doc =>{
    res.status(200).json(doc)

  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
}
  }
  export function getAll(req, res) {

    match
      .find({$or:[{"IdSession":req.session.user._id },{"IdReciver":req.session.user._id }]})
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
  export async function getAlll(req, res) {
    try {
      const doc = await match.find({
        $and: [
          { "Etat": true},
          { $or: [
            { "IdSession": req.session.user._id },
            { "IdReciver": req.session.user._id }
          ]}
        ]
      });
  
      
      for (let i = 0; i < doc.length; i++) {
        let userr;
        if (doc[i].IdReciver === req.session.user._id) {
          doc[i].userr = await user.findOne({ "_id": doc[i].IdSession });
        } else {
          doc[i].userr = await user.findOne({ "_id": doc[i].IdReciver });
        }
      }
      
      res.status(200).json(doc);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  export async function matchoutfitR(req,res){
    
    let Match = await match.findOne({"_id":req.params.id})
    console.log(Match.IdOutfitR)
    if(req.session.user._id === Match.IdSession)
    {
      outfit.find({_id:{$in : Match.IdOutfitR}})
      .then(doc =>{

        res.status(200).json(doc,)
    
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
    }else{
      outfit.find({_id:{$in : Match.IdOutfit}})
      .then(doc =>{
        res.status(200).json(doc)
    
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
    }
      }
      var totradee 
      var totradeeR ;
      export   function trade(req,res){

      
          match.findOne({"_id":req.params.id}).then(doc => {
          console.log(doc)
          console.log(doc.totrade)

          if(typeof doc.totrade === 'undefined'|| doc.totrade === ""){
            console.log('dkhalt')
          match.updateOne({"_id":req.params.id  },{
              $set:{
                totrade : req.body.totrade, 
                totradeR : req.body.totradeR ,
                trader : req.session.user._id
             }
            }
             ).then(doc =>{
              res.status(200).json(doc)
          
            })
            .catch(err => {
              res.status(500).json({ error: err });
            });

          } else {
            match.findOne({"_id":req.params.id ,totrade : req.body.totradeR ,totradeR : req.body.totrade }).then(async doc =>{
              console.log(doc)
              if(doc === null){
                console.log("mafamech")
              } else {
                totradee = doc.totrade
                totradeeR = doc.totradeR

                console.log(doc)
                if(doc.trader === req.session.user._id)
                {
                  console.log("haja")
                }else{
                 await outfit.findOneAndUpdate({_id:req.body.totrade},{$set:{
                    userID :  doc.trader
                    
                  }})
                  
                await outfit.findOneAndUpdate({_id:req.body.totradeR},{$set:{
                    userID : req.session.user._id
                    
                  }})

                  await match.findOneAndUpdate({"_id":req.params.id},{$set:{
                totrade : "", 
                totradeR : "",
                trader : ""

                  }})
                  await match.findOneAndUpdate({"_id":req.params.id},{$pull:{
                        IdOutfit : totradeeR,
                        IdOutfitR : totradee,
                       // IdOutfit : [totrade,totradeR],
                      }})
                      await match.findOneAndUpdate({"_id":req.params.id},{$pull:{
                        IdOutfit : totradee,
                        IdOutfitR : totradeeR
                       // IdOutfit : [totrade,totradeR],
                      }})
                  console.log("wkayet tabdil")
                }
                
              }
            })
          }
        })
        
        
      }