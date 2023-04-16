const Blog = require("../models/blog.model");

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).populate("author");
    res.send(blogs);
};

exports.getBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.send(blog);
};

exports.createBlog = async (req, res) => {
    const blog = req.body;
    const newBlog = new Blog(blog);
    const result = await newBlog.save();
    res.send({ acknowledge: true, updatedId: result._id });
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const result = await Blog.findByIdAndUpdate(id, { $set: req.body });
    res.send({ acknowledge: true, updatedId: result._id });
};

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    const result = await Blog.findByIdAndRemove(id);
    res.send({ acknowledge: true, updatedId: result._id });
};
