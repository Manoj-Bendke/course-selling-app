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
    res.status(400).json(e.errorResponse.errmsg);
  }
});
userrouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const match = bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user._id }, userJWT);
      return res.status(200).json({ token: token });
    }
    return res.status(403).json("Incorrect Password");
  }
  res.status(404).json("User Not Found, Please Sign up");
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
  console.log(hashedpass);
  try {
    await User.create({
      email,
      lastName,
      firstName,
      password: hashedpass,
    });
    res.status(200).send("Admin Sign Up");
  } catch (e) {
    res.status(400).send(e);
  }
});

userrouter.get("/purchases", middlewares(userJWT), async (req, res) => {
  const userId = req.userId;
  const purchases = await Purchase.find({ userId: userId });
  if (!purchases || purchases.length === 0) {
    return res.status(400).json({ error: "You have not purchased any course yet" });
  }
  const courseData = await Course.find({ _id: { $in: purchases.map((x) => x.courseId) } });
  res.status(200).json(courseData);
})

export { userrouter };
