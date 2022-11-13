import outfit from '../models/outfit.js';

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
    outfit
        .create(req.body)
        .then(newoutfit => {
            res.status(200).json(newoutfit);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export function getOnce(req, res) {
    outfit
        .findOne({ "id": req.params.id })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}



/**
 * Mettre à jour un seul document
 */
export function patchOnce(req, res) {
    outfit
        .findOneAndUpdate(req.params.id, req.body)
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
        .findOneAndRemove(req.params.id)
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}