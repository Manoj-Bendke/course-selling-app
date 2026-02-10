import { Router } from "express";
import jwt from "jsonwebtoken";
import { Admin, Course } from "../db.js";
import bcrypt from "bcrypt";
import { adminJWT } from "../config.js";
import { middlewares } from "../middlewares/auth.js";
import { validator } from "../middlewares/validators.js";
const adminrouter = Router();

adminrouter.get("/courses", middlewares(adminJWT), async (req, res) => {
  const id = req.userId;
  const courses = await Course.find({ creatorId: id });
  if (!courses) {
    res
      .status(400)
      .json({ error: "Something went wrong while fetching courses" });
  }
  res.send(courses);
});
adminrouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    return res.status(403).json("Invalid email");
  }
  const match = await bcrypt.compare(password, admin.password);
  if (match) {
    const token = jwt.sign({ id: admin._id }, adminJWT);
    return res.status(200).json({ token: token });
  }
  return res
    .status(403)
    .json({ error: "Passwords do not match. Authentication failed." });
});

adminrouter.post("/signup", validator, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);
  try {
    await Admin.create({ firstName, lastName, email, password: hashedPass });
    return res.status(200).json({ message: "you have signed up" });
  } catch (e) {
    return res
      .status(400)
      .json(e.errorResponse?.errmsg || e.message || "Failed to sign up admin");
  }
});

adminrouter.post("/createcourse", middlewares(adminJWT), async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  const creatorId = req.userId;
  if (!title || !description || !price || !imageLink) {
    return res.status(400).json({ Error: "All the fields are required" });
  }
  try {
    await Course.create({ title, description, price, imageLink, creatorId });
    res.status(201).json("Course Created successfully!");
  } catch (error) {
    return res
      .status(400)
      .json(
        error.errorResponse?.errmsg ||
          error.message ||
          "Failed to create course",
      );
  }
});
export { adminrouter };
