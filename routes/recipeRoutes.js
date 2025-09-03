const express = require("express");
const { createRecipe, getRecipe } = require("../controllers/recipeController");
const router = express.Router();

router.route("/create").post(createRecipe);

router.route("/:id").get(getRecipe)


module.exports = router;