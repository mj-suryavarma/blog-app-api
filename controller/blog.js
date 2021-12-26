import { StatusCodes } from 'http-status-codes';
import { UnauthenticationError } from '../errors/index.js';
import BlogModel from '../models/blog.js';



export const createBlog = async(req,res) => {
    const {title, story, type,googleUserId, userName, googlePicture}  = req.body;
    const {userId, name } = req.user;
    var time = new Date();
    var currentTime = time.toLocaleTimeString();
    var currentDate = time.toLocaleDateString();
 
    if(type === "auth"){

      const authStory =  await BlogModel.create({userId,userName:name, title, googlePicture,story, userType:type, time:currentTime, date:currentDate});
     
        res.status(StatusCodes.CREATED).json({success:true, data: authStory})
 
    }
    else if(type==="google"){

       const googleUserBlog =  await BlogModel.create({title, time:currentTime, story,userType:type, userName, googlePicture, userId:googleUserId,date:currentDate})
         res.status(StatusCodes.CREATED).json({success:true,data:googleUserBlog})
    }
}

export const updateBlog = (req,res) => {
    res.status(200).send("blog updated... ")
}

export const deleteBlog =(req,res) => {
    res.status(200).send("blog deleted ... ")
}

export const getAllBlog = async(req,res) => { 

   const  publicBlog =  await BlogModel.find().sort({"createdAt":-1});
         
        // console.log(publicBlog);

    res.status(StatusCodes.OK).json(publicBlog);

}

export const getSingleBlog = async (req,res) => {
    const {userId, name} = req.user;
    const {type , id} = req.body
    const singleBlog  =  await BlogModel.findOne({_id:id});
    
    console.log(singleBlog)

    if(singleBlog === null){
     res.status(StatusCodes.NOT_FOUND).json({err: "nothing here based your id..."})
    }
     res.status(StatusCodes.OK).json(singleBlog);
     
    
}