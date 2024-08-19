const registerController = async (req,res)=>{
    try{
        const { username, email , password} = req.body;

    }catch(err){
        console.log(err);
        return res.status(500).send({
            success : false,
            message : "Error in Registration API",
            err
        })
    }
}

module.exports = {registerController};