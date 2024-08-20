const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { 
    getusercontroller, 
    updateUser, 
    updatepassword,
    passwordresetcontroller,
    deleteuserprofile} = 
    require("../controller/userController");
const router = express.Router();


router.get('/getuser',authmiddleware,getusercontroller);

router.put('/updateuser',authmiddleware,updateUser)

router.post('/updatepassword',authmiddleware,updatepassword)

router.post('/resetpassword',authmiddleware, passwordresetcontroller);

router.delete('/deleteuser/:id',authmiddleware,deleteuserprofile)

module.exports = router;

