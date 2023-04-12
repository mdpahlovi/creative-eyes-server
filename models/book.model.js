const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema(
    {
        name: String,
        location: String,
        phone: Number,
        details: String,
        date: { startDate: String, endDate: String },
        userId: { type: ObjectId, ref: "user" },
        service: { id: { type: ObjectId, ref: "service" }, name: String },
    },
    { timestamps: true }
);

const Book = mongoose.models.book || mongoose.model("book", bookSchema);

module.exports = Book;
