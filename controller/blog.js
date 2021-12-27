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

export const updateBlog = async(req,res) => {
    //  console.log("recieved", req)
 
            const {title, story, type, userId, userName, googlePicture, blogId} = req.body;

    // const {userId, name } = req.user;     or we can get directly from client because of some reasons
    
    var time = new Date();
    var currentTime = time.toLocaleTimeString();
    var currentDate = time.toLocaleDateString();
    
    const updatedBlog = await BlogModel.findOneAndUpdate({_id:blogId,  userId,},{time:currentTime, date:currentDate,title,story} ,{new:true, runValidators:true});

   console.log("updated blog........",updatedBlog)
    
   if(!updateBlog){
        res.status(StatusCodes.NOT_FOUND).json({err:`nothing any task with id: ${_id}`})

    }
  
res.status(StatusCodes.OK).json({success:true},updatedBlog)



}


export const deleteBlog =(req,res) => {
    res.status(200).send("blog deleted ... ")
}

export const getAllBlog = async(req,res) => { 

   const  publicBlog =  await BlogModel.find().sort({"createdAt":-1});
        
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

export const getUserBlogs = async(req, res) => {
    const {userId} = req.user;
    const {googleUserId, type} = req.body;

    if(type==="auth"){
      const userBlog = await BlogModel.find({userId});

          res.status(StatusCodes.OK).json(userBlog);
    }

    else if(type==="google"){
        const googleUserBlog = await BlogModel.find({userId: googleUserId})

            res.status(StatusCodes.OK).json(googleUserBlog)
        
    }
    


}