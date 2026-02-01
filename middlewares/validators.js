import * as z from "zod"; 

 const validator = (req,res,next,err) =>{
  const {email,firstName, lastName, password} = req.body;
  
}
export {validator}