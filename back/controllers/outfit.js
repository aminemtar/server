import outfit from '../models/outfit.js';
import session from 'express-session';
import user from '../models/user.js';
import mongoose from 'mongodb'
import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export function getAll(req, res) {

    outfit
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export async function addOnce(req, res) {
    // Invoquer la méthode create directement sur le modèle
    let userid = req.session.user._id
    let imageF;
    let i;
    if (req.file) {
      imageF = req.file.filename
     // i = imageF.replace(imageF.slice(imageF.indexOf('.')), '.webp')
    //   const { filename: image } = req.file;
       
    //     await sharp(req.file.path)
    //      .resize(200, 200)
    //      .jpeg({ quality: 90 })
    //      .toFile(
    //          path.resolve(req.file.destination,'outfit',image)
    //      )
    //      fs.unlinkSync(req.file.path)
        //  imagemin([req.file.path], {
        //     destination: './uploads/outfit',
        //     plugins: [
        //       imageminWebp({
        //            quality: 80
        //         //   ,
        //         //   resize: {
        //         //     width: 1000,
        //         //     height: 0
        //         //   }
        //         ,rotate : 90
        //       }),
        //     ],
        //   }).then(() => {
        //     fs.unlinkSync(req.file.path)
        //     console.log("Images Converted Successfully!!!");
        //   });
    }
    let out ={
        typee:req.body.typee,
        taille:req.body.taille,
        couleur:req.body.couleur,
        category:req.body.category,
        userID:userid,
        photo:imageF,
     
    }
    outfit
        .create(out)
        .then(newoutfit => {
            res.status(200).json(newoutfit);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export function getOnce(req, res) {
    outfit
        .findOne({ "_id": req.params.id })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export function getOutfitByType(req, res) {
    outfit
        .find({ "typee": req.params.typee ,userID:req.session.user._id})
        .then((doc) => {
         

            res.status(200).json(doc);
            console.log(doc)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
var haja 
export function getswiped(req,res)
{
    user
    .find({"_id":req.session.user._id})
    .then((doc =>{
     console.log(doc[0].swiped)
     let s = doc[0].swiped
     haja = s
        res.status(200).json(s);
        return s
    }))
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

var bo = false
var data2
export async function getOutfitByUser(req, res) {
  
    //let list =  mongoose.ObjectId(haja)
    console.log( haja)
    console.log( "---------------")

    //console.log( mongoose.ObjectId(haja))
  await  outfit
        .find({userID:{$nin :[req.session.user._id]},_id:{$nin:haja}})
        .then((doc) => {
           // let list = elem.map(s => mongoose.ObjectId(s))
              // console.log(doc)
           
              res.status(200).json(doc)
              console.log(doc)
            
   
         
            

           // res.status(200).json(doc);
           
            
           
        })

        .catch(err => {
            res.status(500).json({ error: err });
        });
}

/**
 * Mettre à jour un seul document
 */
export function patchOnce(req, res) {
    const { typee, couleur, taille, description} = req.body
    outfit
        .findOneAndUpdate({"_id":req.params.id}, req.body,{
            $set: {
              typee,
              description,
              taille,
              couleur
              
            },
          })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

/**
 * Supprimer un seul document
 */
export function deleteOnce(req, res) {
    outfit
        .findOneAndRemove({"_id":req.params.id})
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
export async function Updatephoto(req,res){

    
    const outfitt = await outfit.findOne({ "_id":req.params.id})
    let photo;
    if (req.file) {
      photo = req.file.filename
      const { filename: image } = req.file;
       
        // await sharp(req.file.path)
        //  .resize(200, 200)
        //  .jpeg({ quality: 90 })
        //  .toFile(
        //      path.resolve(req.file.destination,'outfit',image)
        //  )
        //  fs.unlinkSync(req.file.path)
        // i = photo.replace(photo.slice(photo.indexOf('.')), '.webp')
       
        //      imagemin([req.file.path], {
        //         destination: './uploads/outfit',
        //         plugins: [
        //           imageminWebp({
        //                quality: 80
        //             //   ,
        //             //   resize: {
        //             //     width: 1000,
        //             //     height: 0
        //             //   }
        //             ,rotate : 90
        //           }),
        //         ],
        //       }).then(() => {
        //         fs.unlinkSync(req.file.path)
        //         console.log("Images Converted Successfully!!!");
        //       });
    
      let outfitt = await outfit.findOneAndUpdate(
        { "_id":req.params.id },
        {
          $set: {
            photo:photo,
            
          },
        }
      )
  
      return res.send({ message: "Photo updated successfully", outfitt,photo})
    } else {
      return res.status(403).send({ message: "Photo should not be empty" })
    }
  
  }