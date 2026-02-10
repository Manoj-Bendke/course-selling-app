import { Router } from "express";
import bcrypt from "bcrypt";
import { Course, User,Purchase } from "../db.js";
import { middlewares } from "../middlewares/auth.js";
import { userJWT } from "../config.js";
import { validator } from "../middlewares/validators.js";
import jwt from "jsonwebtoken";
const userrouter = Router();

userrouter.get("/courses", middlewares(userJWT), async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).send(courses); 
  } catch (e) {
    res.status(400).json(e.errorResponse?.errmsg || e.message || "Failed to fetch courses");
  }
});
userrouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = await User.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user._id }, userJWT);
      return res.status(200).json({ token: token });
    }    
    return res.status(403).json({ error: "Incorrect Password" });
  }
  res.status(404).json({ error: "User Not Found, Please Sign up" });
  } catch (e) {   
    res.status(400).json(e.errorResponse?.errmsg || e.message || "Failed to sign in");
  }
});

userrouter.post("/signup", validator, async (req, res) => {
  const { email, password, lastName, firstName } = req.body;
  if (!email) {
    return res.status(403).json({ error: "A Valid email is required" });
  }
  if (!password || !lastName || !firstName) {
    return res
      .status(403)
      .json({ error: "Please fill all the fields properly" });
  }
  const hashedpass = await bcrypt.hash(password, 10);
  try {
    await User.create({
      email,
      lastName,
      firstName,
      password: hashedpass,
    });
    res.status(200).send("User has been signed up successfully");
  } catch (e) {
    res.status(400).json(e.errorResponse?.errmsg || e.message || "Failed to sign up");
  }
});

userrouter.get("/purchases", middlewares(userJWT), async (req, res) => {
  const userId = req.userId;
  try {
  const purchases = await Purchase.find({ userId: userId });
  if (!purchases || purchases.length === 0) {
    return res.status(400).json({ error: "You have not purchased any course yet" });
  }
  const courseData = await Course.find({ _id: { $in: purchases.map((x) => x.courseId) } });
  res.status(200).json(courseData);
  } catch (e) { 
    res.status(400).json(e.errorResponse?.errmsg || e.message || "Failed to fetch purchases");
  }
})

export { userrouter };
