const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        price: Number,
        details: String,
    },
    { timestamps: true }
);

const Service = mongoose.models.service || mongoose.model("service", serviceSchema);

module.exports = Service;
