import { Router } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../db.js";
import bcrypt from "bcrypt";
import { adminJWT } from "../config.js";
import { middlewares } from "../middlewares/auth.js";
import { validator } from "../middlewares/validators.js";
const adminrouter = Router();

adminrouter.get("/courses", middlewares(adminJWT), (req, res) => {
    
  res.send("Admin courses Page");
});
adminrouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email});
  if(!admin){
    return res.status(403).json("Invalid email");
  }
  bcrypt.compare(password, admin.password, (err, result)=>{
    if(err){
    return res.status(400).json(err);
    }
    if (result) {
      const token = jwt.sign({
        id : admin._id
      },adminJWT)

      return res.status(200).json({token : token})
    } else {
    return res.status(403).json({error : "Passwords do not match. Authentication failed."});
    }
  })

});

adminrouter.post("/signup", validator, async (req, res) => {
  const { firstName,lastName, email, password } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);
  try {
    await Admin.create({ firstName, lastName, email, password: hashedPass });
    res.status(200).json({message :"you have signed up"})
  } catch (e) {
    res.status(400).json({e : "you have already signed up"});
  }
});

adminrouter.post("/createcourse", (req, res) => {
  res.send("Create Course");
});
export { adminrouter };
