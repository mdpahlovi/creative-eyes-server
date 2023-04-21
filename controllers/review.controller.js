const Review = require("../models/review.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.getAllServiceReview = async (req, res) => {
    const { id } = req.params;
    const reviews = await Review.find({ serviceId: new ObjectId(id) }).populate("author");
    res.send(reviews);
};

exports.getReview = async (req, res) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.send(review);
};

exports.postReviews = async (req, res) => {
    const review = req.body;
    const newReview = new Review(review);
    const result = await newReview.save();
    res.send({ acknowledge: true, insertedId: result._id });
};

exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const result = await Review.findByIdAndUpdate(id, { $set: req.body });
    res.send({ acknowledge: true, updatedId: result._id });
};

exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    const result = await Review.findByIdAndRemove(id);
    res.send({ acknowledge: true, deletedId: result._id });
};
