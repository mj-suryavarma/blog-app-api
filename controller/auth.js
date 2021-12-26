 import authModel from '../models/auth.js';
import {StatusCodes} from 'http-status-codes';
import {BadRequestError, UnauthenticationError} from '../errors/index.js'

export const Register = async(req, res) =>{

    const {name,email,password} = req.body;

      const findUser = await authModel.findOne({name,email})
      
   if(findUser === null){
    const userCreated = await authModel.create({name,email,password})
    if(userCreated) {
        res.status(StatusCodes.CREATED).json({success: true});
    }
    else{
        res.status(500).json({err : "something went wrong..."})
    }
  }
  else {
      res.status(StatusCodes.OK).json({msg: "user already have an account please go SignIn"})
  }

}



export const Login = async(req,res) =>{
    console.log(req.body)
     const {email, password} = req.body
    
   if(!email || !password){       
        throw new BadRequestError("please provide email and password")
   }

   /// find user in db

     const getUser = await authModel.findOne({email});

     if(getUser === null) {
         res.status(StatusCodes.OK).json({msg: " nothing have any account. please go register"})
          } 
        else {
          /// compare passwrod
     const isMatch = await getUser.comparePassword(password);

     if(isMatch){
           /// create token
       const token = getUser.createJwt();
       res.status(StatusCodes.CREATED).json({user: {name:getUser.name,id:getUser._id}, token});
     } else{
       throw new UnauthenticationError("Authentication Invalid");
     }
          
    }
     
}

