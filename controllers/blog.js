import { blogDao } from "../dao/index.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogDao.fetchAllBlogs();
    if (blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "No blogs found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await blogDao.editBlogById(req.params.id, req.body);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await blogDao.deleteBlogById(req.params.id);
    if (deletedBlog) {
      res.status(200).json({ message: "Deleted blog successfully" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const createBlog = async (req, res) => {
  try {
    const { userId, content, images } = req.body;
    const createBlog = await blogDao.createBlog(userId, content, images);
    res.status(201).json({ message: "blog added successfully", createBlog });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
export default { getAllBlogs, updateBlog, deleteBlog, createBlog };
