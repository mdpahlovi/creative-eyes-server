const express = require("express");
const router = express.Router();
const { postMedia, getBookMedia } = require("../controllers/media.controller");

router.get("/book/:id", getBookMedia);
router.post("/", postMedia);

module.exports = router;
