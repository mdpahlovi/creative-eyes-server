const express = require("express");
const router = express.Router();
const { getAllServices, postServices, getService, updateService, deleteService } = require("../controllers/service.controller");

router.get("/", getAllServices);
router.get("/:id", getService);
router.post("/", postServices);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
