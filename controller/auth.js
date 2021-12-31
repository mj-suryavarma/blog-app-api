 import authModel from '../models/auth.js';
import {StatusCodes} from 'http-status-codes';
import {BadRequestError, UnauthenticationError} from '../errors/index.js';
import BlogModel from '../models/blog.js';

export const Register = async(req, res) =>{

    const {name,email,password} = req.body;

      const findUser = await authModel.findOne({name,email})
      
   if(findUser === null){
    const userCreated = await authModel.create({name,email,password})
    if(userCreated) {
     return   res.status(StatusCodes.CREATED).json({success: true});
    }
    else{
       return res.status(500).json({err : "something went wrong..."})
    }
  }
  else {
      return res.status(StatusCodes.OK).json({msg: "user already have an account please go SignIn"})
  }

}



export const Login = async(req,res) =>{
    console.log(req.body)
     const {email, password} = req.body
    
   if(!email || !password){       
        throw new BadRequestError("please provide email and password")
   }

   /// find user in db

     const getUser = await authModel.findOne({email})
 
     if(getUser === null) {
        return res.status(StatusCodes.OK).json({msg: " nothing have any account. please go register"})
          } 
        else {
          /// compare passwrod
     const isMatch = await getUser.comparePassword(password);

     if(isMatch){
           /// create token
       const token = getUser.createJwt();
      return res.status(StatusCodes.CREATED).json({user: {name:getUser.name,id:getUser._id}, token});
     } else{
       throw new UnauthenticationError("Authentication Invalid");
     }
          
    }
     
}


export const authUser = async(req,res) => {
   
  const {id} = req.body; 

  const getauthUser = await authModel.findOne({_id:id})
  
  if(!getauthUser){
   return res.status(StatusCodes.NOT_FOUND).send("something went wrong");

  }
   return res.status(StatusCodes.OK).json(getauthUser)

}

export const deleteUser = async(req, res) => {

  const {id} = req.body;
 const deleteUser = await authModel.findOneAndDelete({_id:id});

 if(!deleteUser){
  return res.status(StatusCodes.NOT_FOUND).json({err : "user not found"})
}


 //// get user's all document
 const userBlog = await BlogModel.find({userId:id})

 /// delete user's each document.
        var userBlogArray = [];
              userBlogArray = userBlog 
 
   userBlogArray.map(async(element) => {
     
     const deleteUserBlog = await BlogModel.findOneAndDelete({_id:element.id});
       console.log("deleted user blogs",deleteUserBlog);

      });
      
      return res.status(StatusCodes.OK).json({success:true});

  

}