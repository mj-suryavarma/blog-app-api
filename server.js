import express from 'express';
const app = express();
/// routers
import authRoutes from './routes/auth.js';
import cors from 'cors';
import GoogleRoutes from './routes/google-auth.js';
import BlogRoutes from './routes/blog.js';
 

/// dot env config
import dotenv from 'dotenv';

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))


/// db config
import { connectDB } from './db/connect.js';


//// middle ware 
import authenticationMiddleware from './middleware/authentication.js';

const port = process.env.PORT || 8000;




app.use('/api/v1',authRoutes);
app.use('/api/v1/google',GoogleRoutes);
app.use('/api/v1/app',authenticationMiddleware,BlogRoutes);


app.get('/',(req,res)=>{
    res.status(200).send("hello world from backend...")
})


const start = () => {

    connectDB(process.env.MONGO_URI);
    app.listen(port, ()=>{
        console.log(`server listening the port no : ${port}`)
    })
}

/// start app
start();

