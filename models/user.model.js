const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        avatar: String,
        isAdmin: Boolean,
    },
    { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = User;
