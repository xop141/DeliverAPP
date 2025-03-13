import bcrypt from 'bcrypt';
import User from '../../model/usermodel.js';

const getUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.password) {
      return res.status(500).json({ message: 'No password found for this user' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }



    res.status(200).json({
      message: 'Login successful' 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export default getUser;
