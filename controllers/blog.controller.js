const Blog = require("../models/blog.model");

exports.getBlogs = async (req, res) => {
    const { page } = req.query;
    const { search } = req.query;
    const query = { $or: [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }] };
    const blogs = await Blog.find(query)
        .populate("author")
        .skip(6 * parseInt(page))
        .limit(6);
    const total_blogs = await Blog.count(query);
    res.send({ total_blogs, blogs });
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
    res.send({ acknowledge: true, deletedId: result._id });
};
