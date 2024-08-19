const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { 
    getusercontroller, 
    updateUser, 
    updatepassword} = 
    require("../controller/userController");
const router = express.Router();


router.get('/getuser',authmiddleware,getusercontroller);

router.put('/updateuser',authmiddleware,updateUser)

router.post('/updatepassword',authmiddleware,updatepassword)

module.exports = router;

