require("colors");
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middle Wire
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pahlovi Server Running Okk");
});

const url = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.v2g7zap.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const fun = async () => {
    await client.connect();
    const servicesCategories = client.db("photoGrapher-services").collection("categories");
    app.get("/services", async (req, res) => {
        const curser = servicesCategories.find({});
        const categories = await curser.toArray();
        console.log(categories);
        res.send(categories);
    });
};
fun().catch((error) => console.log(`${error.name.bgRed.bold}: ${error.message.red}`));

app.listen(port);
