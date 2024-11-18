const Blog = require('../models/blog');

// Create Blog
exports.createBlog = async (req, res) => {
    try {
        const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
        const { title, content, tags,author, imageUrl } = req.body;
        if(!title || !content || !tags || !author || !imageUrl){
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if(!imageUrlRegex.test(imageUrl)){
            return res.status(404).json({ message: "image url not found" });
        }
        const blog = new Blog({ title, content, tags,author, imageUrl });
        const saveBlog = await blog.save();
        res.status(201).json(saveBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();  // Get all blogs
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        }
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Single Blog by ID
exports.getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);  // Get single blog by id
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Couldn't find blog" });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Couldn't find blog" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
