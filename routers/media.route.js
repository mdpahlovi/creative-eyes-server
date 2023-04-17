const express = require("express");
const router = express.Router();
const { postMedia, getBookMedia, getUserMedia, updateBookMedia } = require("../controllers/media.controller");

router.get("/user/:id", getUserMedia);
router.get("/book/:id", getBookMedia);
router.post("/", postMedia);
router.patch("/book/:id", updateBookMedia);

module.exports = router;
