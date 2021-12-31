import { StatusCodes } from 'http-status-codes';
import BlogModel from '../models/blog.js';


export const getAllBlog = async(req,res) => { 

    console.log(publicBlog);
    
    const  publicBlog =  await BlogModel.find().sort({"timestamp":-1});
          
 
     res.status(StatusCodes.OK).json(publicBlog);
 
 }
 