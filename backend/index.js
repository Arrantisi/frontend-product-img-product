import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import fileUpdload from "express-fileupload";
// import sequelize from "./config/database.js";
import produckRoute from "./routes/product.js"

// (async () => {
//     await sequelize.sync()
// })()

dotenv.config()

const port = process.env.BASE_URL;

const app = express();

app.use(fileUpdload());
app.use(express.static("public"))
app.use(express.json());
app.use(cors());

app.use(produckRoute)

app.listen(port, () => {
    console.log(`server up and running at port ${port}`)
})
