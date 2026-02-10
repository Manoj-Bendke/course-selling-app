import { Router } from "express";
import {userJWT} from '../config.js';
import { middlewares } from "../middlewares/auth.js";
import {Purchase,Course} from '../db.js'
const courserouter =  Router();

courserouter.post('/enroll', middlewares(userJWT), async(req, res) => {
  const userId = req.userId;
  const courseId = req.body;
  console.log(req.body);
  if(!userId || !courseId){
    return res.status(400).json({error: "Missing inputs"});
  } 
  const enrolled = await Purchase.findOne({ 
    userId,courseId
  })
  const course = await Course.findOne({_id : courseId})
  if(!course){
    return res.status(400).json({error : "Course doesn't exists"})
  }
  else if(enrolled){
    return res.status(409).json({error : "you are already enrolled in this course"})
  }
  try{
 await Purchase.create({userId,
    courseId
  })
  res.status(200).json({message : "Course enrolled successfully"})
  }catch(e){
    res.status(400).json(e.errorResponse.errmsg)
  }
});

courserouter.get('/preview', async(req, res) => {
  const {courseId} = req.body;
  if(!courseId){
    return res.status(400).json({error: "Missing inputs"});
  }
  const courseData = await Course.findOne({_id : courseId})
  if(!courseData){
    return res.status(400).json({error : "Course doesn't exists"})
  }
  res.status(200).json(courseData);
});

export { courserouter };