const express = require("express");
const router = express.Router();
const { getAndCreateUser, getUser, getAllUser, updateUser } = require("../controllers/user.controller");

router.get("/:email", getUser);
router.get("/", getAllUser);
router.post("/", getAndCreateUser);
router.patch("/:id", updateUser);

module.exports = router;
