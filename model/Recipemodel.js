const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true },
            unit: { type: String, required: true },
        }
    ],
    instructions: {
        type: [String],
        required: true,
    },
    preparationTime: {
        type: Number, // Time in minutes
        required: true,
    },
    cookingTime: {
        type: Number, // Time in minutes
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String, // URL to the image
    },
    tags: {
        type: [String],
    },
    nutritionalInfo: {
        calories: { type: Number },
        protein: { type: Number },
        fat: { type: Number },
        carbohydrates: { type: Number },
    },
    rating: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now },
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
