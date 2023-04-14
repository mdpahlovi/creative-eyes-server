const mongoose = require("mongoose");
const Media = require("../models/media.model");
const { ObjectId } = mongoose.Types;

exports.getUserMedia = async (req, res) => {
    const { id } = req.params;
    const media = await Media.find({ userId: new ObjectId(id) });
    res.send(media);
};

exports.postMedia = async (req, res) => {
    const media = req.body;
    const newMedia = new Media(media);
    const result = await newMedia.save();
    res.send({ acknowledge: true, insertedId: result._id });
};
