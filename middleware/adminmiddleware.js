const userModel = require("../model/userModel");

module.exports = async (req,res,next) => {
    try{
        const user  = await userModel.findById(req.body.id);
        if(user.role !== 'admin'){
            return res.status(401).send({
                success:false,
                message:"You are not authorized to access this route"

            });

        } else {
            next();
        }
    }

    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Unauthorized access!",
            error
        })
        
    }
}