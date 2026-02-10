import mongoose from "mongoose";
const schema = mongoose.Schema;
const userSchema = new schema({
  firstName: String,
  lastName: String, 
  email: { type: String, unique: true },
  password: String,
});

const adminSchema = new schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});
const courseSchema = new schema({
  title: { type: String, unique: true },
  description: {type: String, required: true},
  price: {  type: Number, required: true },
  imageLink: {  type: String, required: true  },
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