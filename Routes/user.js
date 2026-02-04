import { Router } from "express";
import bcrypt from "bcrypt";
import { middlewares } from "../middlewares/auth.js";
const userrouter = Router();


userrouter.get('/courses',middlewares, (req, res) => {
  
  res.send('User course Page');
}
);
userrouter.post('/signin', (req, res) => {

  res.send('Admin Sign In');
});   

userrouter.post('/signup', async(req, res) => {
  const {email, password, lastName, firstName} = req.body;
  if(!email  )
  {
    return res.status(403).json({error : "A Valid email is required"});
  }
  if(!password || !lastName  || !firstName  ){
    return res.status(403).json({error : "Please fill all the fields properly"})
  }  
  const hashedpass = bcrypt.hash(password,10);
  try{await userrouter.create({
  email,
  lastName,
  firstName,
  password : hashedpass
  }) 
  res.status(200).send('Admin Sign Up');}catch(e){
    res.status(400).send("something went wrong",e)
  }
}); 

export { userrouter };