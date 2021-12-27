import express from 'express';
const Router = express.Router();


import 
{getAllBlog,
     updateBlog,
     createBlog,
     deleteBlog,
     getSingleBlog,getUserBlogs} from '../controller/blog.js';


Router.route('/app/allBlog').post(getAllBlog)
Router.route('/app/blog').post(createBlog);
Router.route('/app/blog/:id').patch(updateBlog).delete(deleteBlog).post(getSingleBlog);
Router.route('/app/user/blog').post(getUserBlogs);


export default Router;