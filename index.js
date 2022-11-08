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

app.listen(port);
