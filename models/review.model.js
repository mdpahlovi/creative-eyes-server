const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema(
    {
        author: { type: ObjectId, ref: "user" },
        occupation: String,
        detail: String,
        review: Number,
        serviceId: { type: ObjectId, ref: "service" },
    },
    { timestamps: true }
);

const Review = mongoose.models.review || mongoose.model("review", reviewSchema);

module.exports = Review;
