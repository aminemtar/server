import outfit from '../models/outfit.js';
import session from 'express-session';
import user from '../models/user.js';

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

export function addOnce(req, res) {
    // Invoquer la méthode create directement sur le modèle
    let userid = req.session.user._id
    let imageF;
    if (req.file) {
      imageF = req.file.filename
    }
    let out ={
        typee:req.body.typee,
        taille:req.body.taille,
        couleur:req.body.couleur,
        description:req.body.description,
        userID:userid,
        photo:imageF
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
        .find({ "typee": req.params.typee ,"userID":req.params.userID})
        .then((doc) => {
         

            res.status(200).json(doc);
            console.log(doc)
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