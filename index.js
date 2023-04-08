require("colors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const userService = require("./routers/service.route");

// Middle Wire
app.use(cors());
app.use(express.json());

//MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => {}))
    .catch(() => console.log(`Error in DB Connection`));

//Route
app.use("/services", userService);

app.get("/", (req, res) => {
    res.send("Creative Eyes Server Running");
});
