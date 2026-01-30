import { Router } from "express";
const userrouter = Router();

userrouter.get('/courses', (req, res) => {
  res.send('Admin course Page');
}
);
userrouter.post('/signin', (req, res) => {
  res.send('Admin Sign In');
});   

userrouter.post('/signup', (req, res) => {
  res.send('Admin Sign Up');
}); 

export { userrouter };