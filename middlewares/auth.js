import jwt from 'jsonwebtoken';

function middlewares(password){
return function(req, res, next){
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    } 
    try   {
    const decoded = jwt.verify(token,password);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  } 
  }
}

export {middlewares}