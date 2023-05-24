import messages from "../models/messages.js";

export function getmessages(req,res)
{
    messages.find({ "matchID": req.params.id })
        .then(doc => {
            res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: err });
              });
             
       
}