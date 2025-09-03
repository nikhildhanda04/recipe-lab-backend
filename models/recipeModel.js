const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Object,
        required: true
    },
    steps: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Recipe", recipeSchema)