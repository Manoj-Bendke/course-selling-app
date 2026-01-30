import express from "express"
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config({quiet: true});
import {userrouter} from './Routes/user.js'
import {adminrouter} from './Routes/admin.js'
import {courserouter} from './Routes/course.js'

const app = express();

app.use(express.json());

app.use('/api/v1/user',userrouter)
app.use('/api/v1/admin',adminrouter)
app.use('/api/v1/course',courserouter)

async function startServer(){
  try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB"); 
  }catch(err){
    console.log("Error starting server:", err);
  }
}
startServer();
 app.listen(3000,()=>{ 
      console.log("Server started at port 3000");
    })