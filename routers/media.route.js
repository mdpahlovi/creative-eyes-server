const express = require("express");
const router = express.Router();
const { getUserMedia, postMedia } = require("../controllers/media.controller");

router.get("/user/:id", getUserMedia);
router.post("/", postMedia);

module.exports = router;
