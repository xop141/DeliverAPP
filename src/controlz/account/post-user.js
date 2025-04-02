
import User from "../../model/usermodel.js";

import bcrypt from 'bcrypt'



export const postUser = async (req, res) => {
  // const secretKey = process.env.JWT_SECRET_KEY;
  const { username, email, phoneNumber, password, role } = req.body;

  // Simple validation (uncommented)
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Phone number validation (must be exactly 8 digits)
  if (phoneNumber.length !== 8 || !/^\d{8}$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Phone number must be 8 digits' });
  }

  // Password validation (minimum length of 7 characters)
  if (password.length < 7) {
    return res.status(400).json({ message: 'Password must be at least 7 characters' });
  }

  try {
    // Check if any existing user has the same username, email, or phone number
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (existingUser) {
      const message = [];

      if (existingUser.username === username) message.push('Username already taken');
      if (existingUser.email === email) message.push('Email already in use');
      if (existingUser.phoneNumber === phoneNumber) message.push('Phone number already registered');

      // Send a response with the error messages
      return res.status(400).json({ message });
    }

    // Hash the user's password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

  
  
    
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
      // token, // Token is returned only once
    });
  } catch (error) {
    console.error('Error creating user:', error);  // Detailed logging
    // Send error response if something goes wrong
    return res.status(500).json({
      message: 'Error creating user',
      error: error.message,  // Send detailed error message for debugging
    });
  
    
  }
};
