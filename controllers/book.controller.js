const Book = require("../models/book.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.getAllBookingData = async (req, res) => {
    const bookingData = await Book.find({}).populate("userId");
    res.send(bookingData);
};

exports.getBookingData = async (req, res) => {
    const { id } = req.params;
    const bookingData = await Book.findById(id);
    res.send(bookingData);
};

exports.getUserBookingData = async (req, res) => {
    const { id } = req.params;
    const bookingData = await Book.find({ userId: new ObjectId(id) });
    res.send(bookingData);
};

exports.postBooking = async (req, res) => {
    const bookingData = req.body;
    const newBooking = new Book(bookingData);
    const result = await newBooking.save();
    res.send({ acknowledge: true, insertedId: result._id });
};

exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, { $set: req.body });
    res.send({ acknowledge: true, updatedId: result._id });
};
