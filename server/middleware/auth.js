const jwt = require('jsonwebtoken');

const auth = (req,res,next) =>{
    try {
        const token = req.header("Authorization");
        if(!token){
            return res.status(401).json({msg: "Access Denied: Signup or Signin required"});
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
            if(err){
                return res.status(401).json({msg: "Access Denied: Signup or Signin required"});
            }

            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

module.exports = auth