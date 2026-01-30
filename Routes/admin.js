import { Router } from "express";
const adminrouter = Router();

adminrouter.get('/courses', (req, res) => {
  res.send('Admin courses Page');
}
);
adminrouter.post('/signin', (req, res) => {
  res.send('Admin Sign In');
});   

adminrouter.post('/signup', (req, res) => {
  res.send('Admin Sign Up');
}); 

adminrouter.post('/createcourse', (req, res) => {
  res.send('Create Course');
});
export { adminrouter };