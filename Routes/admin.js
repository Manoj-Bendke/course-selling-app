import { Router } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../db.js";
import bcrypt from "bcrypt";
const adminrouter = Router();

adminrouter.get("/courses", (req, res) => {
  res.send("Admin courses Page");
});
adminrouter.post("/signin", (req, res) => {
  res.send("Admin Sign In");
});

adminrouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({ error: "All Field are required" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);
    const resp = await Admin.create({ username, email, password: hashedPass });
    if (!resp) {
      const token = await jwt.sign(
        { username, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );
      console.log("hi3");
      res.status(200).json(token);
    }
  } catch (e) {
    res.status(400).json("Something went wrong with the signup");
  }
});

adminrouter.post("/createcourse", (req, res) => {
  res.send("Create Course");
});
export { adminrouter };
