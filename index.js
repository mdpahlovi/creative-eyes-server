require("colors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const useService = require("./routers/service.route");
const useUser = require("./routers/user.route");
const useBook = require("./routers/book.route");
const useMedia = require("./routers/media.route");
const useBlog = require("./routers/blog.route");
const useReview = require("./routers/review.route");

// Middle Wire
app.use(cors());
app.use(express.json());

//MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => {}))
    .catch(() => console.log(`Error in DB Connection`));

//Route
app.use("/user", useUser);
app.use("/service", useService);
app.use("/book", useBook);
app.use("/media", useMedia);
app.use("/blog", useBlog);
app.use("/review", useReview);

app.get("/", (req, res) => {
    res.send("Creative Eyes Server Running");
});
