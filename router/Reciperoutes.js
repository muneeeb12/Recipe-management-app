const express = require("express");
const { 
    getrecipecontroller, 
    createrecipecontroller} = 
    require("../controller/recipeController");

const router = express.Router();

router.post('/createdata',createrecipecontroller)
router.get('/getdata', getrecipecontroller);

module.exports = router;

