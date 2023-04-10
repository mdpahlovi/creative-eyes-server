const express = require("express");
const router = express.Router();
const { getAndCreateUser } = require("../controllers/user.controller");

router.post("/", getAndCreateUser);

module.exports = router;
