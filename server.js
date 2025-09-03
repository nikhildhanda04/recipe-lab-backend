const express = require("express")
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")

const app = express();

const port = process.env.PORT || 5000;

connectDb();
app.use(express.json());
app.use("/api/user/", require("./routes/userRoutes"))
app.use("/api/recipe/", require("./routes/recipeRoutes"))

app.listen(port, () =>{
    console.log(`server is running on ${port}`);
    
})