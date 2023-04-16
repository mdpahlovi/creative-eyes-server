const express = require("express");
const router = express.Router();
const { postMedia, getBookMedia, getUserMedia } = require("../controllers/media.controller");

router.get("/user/:id", getUserMedia);
router.get("/book/:id", getBookMedia);
router.post("/", postMedia);

module.exports = router;
