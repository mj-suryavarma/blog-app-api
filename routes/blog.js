import express from 'express';
const Router = express.Router();

// middle ware
import authenticationMiddleware from '../middleware/authentication.js';

import 
{getAllBlog,
     updateBlog,
     createBlog,
     deleteBlog,
     getSingleBlog} from '../controller/blog.js';


Router.route('/app/allBlog').post(getAllBlog)
Router.route('/app/blog').post(createBlog);
Router.route('/app/blog/:id').patch(updateBlog).delete(deleteBlog).post(getSingleBlog);


export default Router;