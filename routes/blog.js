import express from 'express';
import { blogController } from '../controllers/index.js';

const blogRouter = express.Router();


blogRouter.get('/', blogController.getAllBlogs);
blogRouter.put('/:id', blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);
blogRouter.post('/', blogController.createBlog);  // Route to create a new blog

export default blogRouter;
