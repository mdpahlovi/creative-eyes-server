const express = require("express");
const router = express.Router();
const { getAllServiceReview, getReview, postReviews, updateReview, deleteReview } = require("../controllers/review.controller");

router.get("/service/:id", getAllServiceReview);
router.get("/:id", getReview);
router.post("/", postReviews);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
