import bcrypt from 'bcrypt';
import User from "../../model/usermodel.js";
import jwt from 'jsonwebtoken';

export const postUser = async (req, res) => {
  const { username, email, phoneNumber, password, role } = req.body;

  // Simple validation (uncommented)
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Phone number validation
  if (phoneNumber.length !== 8 || !/^\d{8}$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Phone number must be 8 digits' });
  }

  // Password validation
  if (password.length < 7) {
    return res.status(400).json({ message: 'Password must be at least 7 characters' });
  }

  try {
    // Check if the username, email, or phone number already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });

    if (existingUser) {
      const message = [];

      // Check each field and append the appropriate message
      if (existingUser.username === username) message.push('Username already taken');
      if (existingUser.email === email) message.push('Email already in use');
      if (existingUser.phoneNumber === phoneNumber) message.push('Phone number already registered');

      return res.status(400).json({ message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: role },
      'mySecretKey',
      { expiresIn: '1h' }  // Token expiration for security
    );

    // Return success response with token
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
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
