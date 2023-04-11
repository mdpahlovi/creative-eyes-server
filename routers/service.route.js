const express = require("express");
const router = express.Router();
const { getAllServices, postServices, getService } = require("../controllers/service.controller");

router.get("/", getAllServices);
router.get("/:id", getService);
router.post("/", postServices);

module.exports = router;
