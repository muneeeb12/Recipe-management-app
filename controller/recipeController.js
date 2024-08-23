const Recipe = require("../model/Recipemodel");

const createrecipecontroller = async(req,res) => {
    const {title,author,cuisine,difficultyLevel,name,ingredients,steps,category,preparationTime,cookingTime,serveTime,
        servings,description} = req.body;
        const newRecipe = new Recipe({
            title:title,
            author:author,
            cuisine:cuisine,
            difficultyLevel:difficultyLevel,
            name:name,
            ingredients:ingredients,
            steps:steps,
            category:category,
            preparationTime:preparationTime,
            cookingTime:cookingTime,
            serveTime:serveTime,
            servings:servings,
            description:description
            });
        try {
            const savedRecipe = await newRecipe.save();
            res.json(savedRecipe);

            
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
}

const getrecipecontroller = async(req,res) =>{
    try {
        const recipe = await Recipe.find();
        res.json(recipe);

        
    } catch (error) {
        res.status(400).json({ message: error.message });
    
    }
    
}

module.exports = {
    createrecipecontroller,
    getrecipecontroller
}