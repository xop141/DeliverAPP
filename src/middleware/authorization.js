// middleware/authorization.js
import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {

  // const jwt_token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'
const jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VjOGZiMGZkOWNkYWIwNGIyZDk5ZjUiLCJ1c2VybmFtZSI6InhvcCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MzcyOTY2NX0.rc9Nxm6EA3a7qpQQ9WsV1Kp5AnoItT3Zn0Gj1Sgh2sI'
  if (!jwt_token) {
    return res.status(401).send('Unauthorized'); // No token, unauthorized
  }

  try {
    // Decode the JWT token (without verifying signature in this example)
    const decoded_payload = jwt.decode(jwt_token, { complete: true });

    if (decoded_payload && decoded_payload.payload.role === 'admin') {
      // If role is 'admin', proceed to the next middleware
      return next();
    } else {
      // If role is not 'admin', deny access
      return res.status(403).send('Forbidden'); // 403 Forbidden
    }
  } catch (err) {
    // Handle any errors that occur during decoding
    console.error('JWT Error:', err);
    return res.status(401).send('Unauthorized');
  }
};

export default authorization;
