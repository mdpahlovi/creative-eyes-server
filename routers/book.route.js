const express = require("express");
const router = express.Router();
const { postBooking, getBookingData, getUserBookingData, getAllBookingData, updateBooking } = require("../controllers/book.controller");

router.get("/", getAllBookingData);
router.get("/:id", getBookingData);
router.get("/user/:id", getUserBookingData);
router.post("/", postBooking);
router.patch("/:id", updateBooking);

module.exports = router;
