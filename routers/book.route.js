const express = require("express");
const router = express.Router();
const { postBooking, getBookingData, getUserBookingData } = require("../controllers/book.controller");

router.get("/:id", getBookingData);
router.get("/:userId", getUserBookingData);
router.post("/", postBooking);

module.exports = router;
