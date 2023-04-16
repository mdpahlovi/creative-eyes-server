const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const mediaSchema = new mongoose.Schema(
    {
        media: { image: Array, audio: Array, video: Array },
        booking: { id: { type: ObjectId, ref: "book" }, name: String },
        userId: { type: ObjectId, ref: "user" },
    },
    { timestamps: true }
);

const Media = mongoose.models.media || mongoose.model("media", mediaSchema);

module.exports = Media;
