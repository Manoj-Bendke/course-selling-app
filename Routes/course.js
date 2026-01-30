import { Router } from "express";
const courserouter = Router();

courserouter.get('/enroll', (req, res) => {
  res.send('Course Page');
});

courserouter.post('/preview', (req, res) => {
  res.send('Preview Course');
});

export { courserouter };