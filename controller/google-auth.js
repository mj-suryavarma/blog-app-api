import googleModel from "../models/google-auth.js";
import {OAuth2Client} from 'google-auth-library'
import { StatusCodes } from "http-status-codes";


 const client = new OAuth2Client('631249414397-4hklutmu3rn135q8h4j85ob79a0r5qmn.apps.googleusercontent.com');




export const googleAuth = (req,res) => {

    const {tokenId} = req.body;
 
  client.verifyIdToken({idToken: tokenId, audience:'631249414397-4hklutmu3rn135q8h4j85ob79a0r5qmn.apps.googleusercontent.com'})
  .then(resData => {
    const {email_verified, email, name, picture}  = resData.payload;
    
      if(email_verified && email && name){

        /// find google user from database
        googleModel.findOne({email})
          .then(response => {
            if(response === null){

               //// create google user 
              googleModel.create({email,name,email_verified,picture})
              .then(createdRes => {
                   res.status(StatusCodes.CREATED).json({data:createdRes});
              })
            }
            else{
               res.status(StatusCodes.OK).json({data: response});
            }
          })
          .catch(err => {
               res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err : "internal server error"})
          })
          
        }
      else{
          res.status(StatusCodes.UNAUTHORIZED).json({err : "verification failed "});
      }

  })
  .catch(err => {
      res.status(404).json({err: "google authentication failed"})
  })


}
 