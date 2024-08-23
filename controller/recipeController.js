const Recipe = require("../model/Recipemodel");

const createrecipecontroller = async(req,res) => {
    try {
        const {title,cuisine,category,cookingTime,instructions,
        servings,description} = req.body;
        const newRecipe = new Recipe({
            title:title,
            instructions:instructions,
            author:req.body.id,
            cuisine:cuisine,
            category:category,
            cookingTime:cookingTime,
            servings:servings,
            description:description,
            });
        
            const savedRecipe = await newRecipe.save();
            res.status(200).send({
                success:true,
                message:"Recipe created successfully",
                data:savedRecipe
            });
    } 
    catch (error) {
            res.status(400).send({
                success:false,
                message:"Error creating recipe",
                error
            });
        }
}

const getrecipecontroller = async(req,res) =>{
    try {
        const title = req.query.title;
        if(!title){
            return res.status(200).send({
                success:true,
                message:"All recipes",
                data:await Recipe.find()       
            })
        }
        const recipe = await Recipe.find({title: new RegExp(title, 'i')});
        if(!recipe){
            return res.status(404).send({
                success:false,
                message:"Recipe not found"
                });
        }
        return res.status(200).send({
            success:true,
            message:"Recipe fetched successfully",
            data:recipe
        });

        
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error fetching recipe",
            error
        }); 
    }
    
}

const updaterecipecontroller = async(req,res) => {
    try {
        const id = req.params.id;
        const {title,description,cookingTime,servings,cuisine,category} = req.body;
        const recipe = await Recipe.findByIdAndUpdate(id,{$set:{
            title:title,
            description:description,
            cookingTime:cookingTime,
            servings:servings,
            cuisine:cuisine,
            category:category
            }},{new:true});
        if(!recipe){
            return res.status(404).send({
                success:false,
                message:"Recipe not found"
            });
        }
        const savedRecipe = await recipe.save();
        return res.status(200).send({
            success:true,
            message:"Recipe updated successfully",
            data:savedRecipe
            });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error updating recipe",
            error
        })
        
    }
}

module.exports = {
    createrecipecontroller,
    getrecipecontroller,
    updaterecipecontroller
}