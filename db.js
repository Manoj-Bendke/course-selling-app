import mongoose from "mongoose";
const schema = mongoose.Schema;
import dotenv from "dotenv";
dotenv.config({quiet: true});
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL); 
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
  
}

connectDB();
const userSchema = new schema({
  firstname: String,
  lastname: String, 
  email: { type: String, unique: true },
  password: String,
});

const adminSchema = new schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});
const courseSchema = new schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  creatorId: String,  
});

const purchaseSchema = new schema({
  userId: String,
  courseId: String,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);  

export { User, Admin, Course, Purchase };