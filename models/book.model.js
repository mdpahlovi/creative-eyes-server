const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema(
    {
        name: String,
        location: String,
        phone: String,
        details: String,
        date: { startDate: String, endDate: String },
        userId: { type: ObjectId, ref: "user" },
        service: { id: { type: ObjectId, ref: "service" }, name: String },
        isComplete: Boolean,
        isMediaUpdated: Boolean,
        isReview: Boolean,
    },
    { timestamps: true }
);

const Book = mongoose.models.book || mongoose.model("book", bookSchema);

module.exports = Book;
