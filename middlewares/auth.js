const jwt = require("jsonwebtoken");
const SECKRET_KEY = "Hustle4work";

const auth = (req,res,next)=>{

    try {
        let token = req.headers['authorization'];
        console.log("Received token:", token);
        
        if(token){

            token = token.split(" ")[1];
            let user = jwt.verify(token, SECKRET_KEY);
            console.log("in aut", user);
            req.userId = user.id;   

        } else {
            res.status(401).json( {message : "unauthorized user!"});
        }

        next();

        
    } catch (error) {
        console.log(error);
        res.status(401).json( {message : "unauthorized user!"});
    }
}

module.exports = auth;