import bcrypt from 'bcrypt';
import User from '../../model/usermodel.js';
import jwt from 'jsonwebtoken';


const getUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (!user.password) {
      return res.status(500).json({ message: 'User found, but no password set' });
    }

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      "secretKey"  
    );

   
    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email, username: user.username },
      token: token 
    });
 
    
  } catch (error) {

    console.log("sda");
    
  }
};

export default getUser;
