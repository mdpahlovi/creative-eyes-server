const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
    {
        author: { type: ObjectId, ref: "user" },
        title: String,
        description: String,
        image: String,
        isVerify: Boolean,
    },
    { timestamps: true }
);

const Blog = mongoose.models.blog || mongoose.model("blog", blogSchema);

module.exports = Blog;
