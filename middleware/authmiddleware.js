const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decode) => {
            if(err) {
                return res.status(401).json({message: "Unauthorized user"});
            }else{
                req.body.id = decode.id;
                next();
            }
           
        })
    }
    catch(error){
        res.status(401).json({message: "Invalid token"})
    }
}