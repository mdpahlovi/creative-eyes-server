const express = require("express");
const { getAllServices, postServices } = require("../controllers/service.controller");

const router = express.Router();

router.get("/", getAllServices);

router.post("/", postServices);

module.exports = router;
