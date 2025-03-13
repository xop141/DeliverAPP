import jwt from 'jsonwebtoken';
import User from '../model/usermodel.js';
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Extract token


  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, 'mySecretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    
    
if (decoded.email === req.body.email) {
  next();  
} else{
  res.send("!!!")
}
   

    
  
  });
};

export default verifyToken;
