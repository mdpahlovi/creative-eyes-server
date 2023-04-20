const express = require("express");
const router = express.Router();
const { postMedia, getBookMedia, getUserMedia, updateBookMedia, deleteBookMedia } = require("../controllers/media.controller");

router.get("/user/:id", getUserMedia);
router.get("/book/:id", getBookMedia);
router.post("/", postMedia);
router.patch("/update/:id", updateBookMedia);
router.patch("/delete/:id", deleteBookMedia);

module.exports = router;
