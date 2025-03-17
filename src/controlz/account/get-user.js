import bcrypt from 'bcrypt';
import User from '../../model/usermodel.js';

const getUser = async (req, res) => {

  // res.status(400).json({ message: "test" });
  // const { email, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).json({ message: 'Email and password are required' });
  // }

  // try {
  //   // Look for the user with the provided email
  //   const user = await User.findOne({ email });
    
  //   // If user doesn't exist, return 404 with message
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   // Check if the user has a password (optional but recommended)
  //   if (!user.password) {
  //     return res.status(500).json({ message: 'User found, but no password set' });
  //   }

  //   // Compare the provided password with the stored hashed password
  //   const isMatch = await bcrypt.compare(password, user.password);
    
  //   // If passwords don't match, return 401 Unauthorized
  //   if (!isMatch) {
  //     return res.status(401).json({ message: 'Invalid credentials' });
  //   }

  //   // If login is successful
  //   res.status(200).json({
  //     message: 'Login successful',
  //     user: { email: user.email, username: user.username } // You can return more user details if needed
  //   });

  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Error logging in', error: error.message });
  // }
};

export default getUser;
