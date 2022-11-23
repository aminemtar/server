import jwt from 'jsonwebtoken';


export default function verif(req,res,next){
const token =req.header("auth-token");
if(!token) return res.status(401).send('access denied')
try {
    const verified = jwt.verify(token,process.env.TOKEN_SECRET)
    req.user =verified;
    next();
} catch (error) {
    res.status(403).send("invalid token please try again")
}
}