const express = require("express");
const router = express.Router();
const { getAndCreateUser, getUser } = require("../controllers/user.controller");

router.get("/:email", getUser);
router.post("/", getAndCreateUser);

module.exports = router;
