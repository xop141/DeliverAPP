import bcrypt from 'bcrypt';
import User from "../../model/usermodel.js";
import jwt from 'jsonwebtoken';

export const postUser = async (req, res) => {

  
  const { username, email, phoneNumber, password, role } = req.body;





  // if (!username) {
  //   return res.status(400).json({ message: 'Username is required' });
  // }
  // if (!email) {
  //   return res.status(400).json({ message: 'Email is required' });
  // }
  // if (!phoneNumber) {
  //   return res.status(400).json({ message: 'Phone number is required' });
  // }
  // if (phoneNumber.length !== 8 || !/^\d{8}$/.test(phoneNumber)) { // Check for exactly 8 digits
  //   return res.status(400).json({ message: 'Phone number must be 8 digits' });
  // }
  // if (!password || password.length < 8) { // Check if password is provided and is at least 8 characters
  //   return res.status(400).json({ message: 'Password is required and must be at least 8 characters' });
  // }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this information already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: role, hashedPassword  }, 
      'mySecretKey',
     
    );

    
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        role: role

      },
      token, 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};
