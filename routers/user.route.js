const express = require("express");
const router = express.Router();
const { getAndCreateUser, getUser, getAllUser } = require("../controllers/user.controller");

router.get("/:email", getUser);
router.get("/", getAllUser);
router.post("/", getAndCreateUser);

module.exports = router;
