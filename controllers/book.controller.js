const Book = require("../models/book.model");

exports.getBookingData = async (req, res) => {
    const { id } = req.params;
    const bookingData = await Book.findById(id);
    res.send(bookingData);
};

exports.getUserBookingData = async (req, res) => {
    const { userId } = req.params;
    const bookingData = await Book.find({ userId: userId });
    res.send(bookingData);
};

exports.postBooking = async (req, res) => {
    const bookingData = req.body;
    const newBooking = new Book(bookingData);
    const result = await newBooking.save();
    res.send({ acknowledge: true, insertedId: result._id });
};
