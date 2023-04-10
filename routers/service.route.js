const express = require("express");
const router = express.Router();
const { getAllServices, postServices } = require("../controllers/service.controller");

router.get("/", getAllServices);

router.post("/", postServices);

module.exports = router;
