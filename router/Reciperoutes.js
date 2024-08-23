const express = require("express");
const { 
    getrecipecontroller, 
    createrecipecontroller,
    updaterecipecontroller} = 
    require("../controller/recipeController");
const { validateRecipeSubmission } = require("../middleware/validator");
const adminmiddleware = require("../middleware/adminmiddleware");
const authmiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post('/createdata',authmiddleware,validateRecipeSubmission,createrecipecontroller)
router.get('/getdata', getrecipecontroller);
router.put('/updatedata/:id',authmiddleware,adminmiddleware,updaterecipecontroller)

module.exports = router;

