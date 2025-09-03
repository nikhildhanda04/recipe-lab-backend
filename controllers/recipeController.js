const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Recipe = require("../models/recipeModel");

//@desc create a recipe
//@route /api/recipe/create
//@access private
const createRecipe = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400);
        throw new Error("Recipe title is required");
    }

    const prompt = `Generate a JSON object with two keys: "ingredients" (an array of ingredient strings) and "steps" (an array of step strings) for a recipe titled "${title}".`;

    try {
        const geminiRes = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        let geminiText = geminiRes.data.candidates[0].content.parts[0].text;

        geminiText = geminiText.replace(/```json|```/g, '').trim();

        let recipeData;
        try {
            recipeData = JSON.parse(geminiText);
        } catch (err) {
            res.status(500);
            throw new Error("Failed to parse Gemini API response: " + geminiText);
        }

        const newRecipe = await Recipe.create({
            title,
            ingredients: recipeData.ingredients,
            steps: recipeData.steps
        });

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500);
        throw new Error("Gemini API error: " + error.message);
    }
});

//@desc get a recipe
//@route /api/recipe/:id
//@access private
const getRecipe = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `this is a recipe` });
});

module.exports = {
    createRecipe,
    getRecipe
}