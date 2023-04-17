const mongoose = require("mongoose");
const Media = require("../models/media.model");
const { ObjectId } = mongoose.Types;

exports.getUserMedia = async (req, res) => {
    const { id } = req.params;
    const media = await Media.find({ userId: new ObjectId(id) });
    res.send(media);
};

exports.getBookMedia = async (req, res) => {
    const { id } = req.params;
    const media = await Media.findOne({ "booking.id": new ObjectId(id) });
    res.send(media);
};

exports.postMedia = async (req, res) => {
    const media = req.body;
    const newMedia = new Media(media);
    const result = await newMedia.save();
    res.send({ acknowledge: true, insertedId: result._id });
};

exports.updateBookMedia = async (req, res) => {
    const media = req.body;
    const { id } = req.params;
    const filter = { "booking.id": new ObjectId(id) };
    const update = {
        $push: {
            "media.image": { $each: media.image },
            "media.audio": { $each: media.audio },
            "media.video": { $each: media.video },
        },
    };

    const result = await Media.findOneAndUpdate(filter, update);
    res.send({ acknowledge: true, updatedId: result._id });
};
