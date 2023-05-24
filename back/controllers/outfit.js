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
import { error } from 'console';

export function getAll(req, res) {

  outfit
    .find({ "userID": req.session.user._id })
    .then(outfit => {
      res.status(200).json(outfit);
      console.log(outfit)
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export function getlockedoutfit(req, res) {

  outfit
    .find({ "userID": req.session.user._id ,locked:true})
    .then(outfit => {
      res.status(200).json(outfit);
      console.log(outfit)
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
  let out = {
    typee: req.body.typee,
    taille: req.body.taille,
    couleur: req.body.couleur,
    category: req.body.category,
    userID: userid,
    photo: imageF,
    locked: false

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
export async function getswiped(req, res) {
  try {
    const doc = await user.find({ "_id": req.session.user._id });
    console.log(doc[0].swiped);
    let s = doc[0].swiped;

    return s;
  } catch (err) {
    return err;
  }
}
export async function getmatcherswiped(req, res) {
  try {
    const doc = await user.find({ "_id": req.params.id });
    console.log(doc[0].swiped);
    let s = doc[0].swiped;

    return s;
  } catch (err) {
    return err;
  }
}
export async function getmswiped(req, res) {
  try {
    const ou = await getmatcherswiped(req, res);
    console.log(ou)
    await outfit.find({ "_id": { $in: ou } })
      .then(doc => {
        res.status(200).json(doc);
      })

    return s;
  } catch (err) {

    return err;
  }

}
export async function getOutfitByType(req, res) {
  const userSwiped = await getswiped(req, res);
  outfit
    .find({
      "typee": req.params.typee, userID: { $nin: [req.session.user._id] },
      _id: { $nin: userSwiped },locked:false
    })
    .then((doc) => {
      res.status(200).json(doc);
      console.log(doc)
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}


export async function getswipedd(req, res) {
  try {
    const ou = await getswiped(req, res);
    console.log(ou)
    await outfit.find({ "_id": { $in: ou } })
      .then(doc => {
        res.status(200).json(doc);
      })

    return s;
  } catch (err) {

    return err;
  }
}

var bo = false
var data2
export async function getOutfitByUser(req, res) {
  try {
    const userSwiped = await getswiped(req, res);
    const outfits = await outfit.find({
      userID: { $nin: [req.session.user._id] },
      _id: { $nin: userSwiped },
    });

    if (outfits) {
      res.status(200).json(outfits);
    } else {
      res.status(404).json({ message: "No outfits found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Mettre à jour un seul document
 */
export function lock(req, res) {
  outfit
    .findOneAndUpdate({ "_id": req.params.id }, {
      $set: {
        locked: true
      },
    })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export function unlock(req, res) {
  outfit
    .findOneAndUpdate({ "_id": req.params.id }, {
      $set: {
        locked: false
      },
    })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export function patchOnce(req, res) {
  const { typee, couleur, taille, description } = req.body
  outfit
    .findOneAndUpdate({ "_id": req.params.id }, req.body, {
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
    .findOneAndRemove({ "_id": req.params.id })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export async function Updatephoto(req, res) {


  const outfitt = await outfit.findOne({ "_id": req.params.id })
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
      { "_id": req.params.id },
      {
        $set: {
          photo: photo,

        },
      }
    )

    return res.send({ message: "Photo updated successfully", outfitt, photo })
  } else {
    return res.status(403).send({ message: "Photo should not be empty" })
  }

}