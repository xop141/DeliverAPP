// // resolvers/postUser.js
import User from "../../model/usermodel.js";

export const postUser = async(req, res) => {
  const { username, email, phoneNumber } = req.body;
  
  
  if (!username || !email || !phoneNumber || phoneNumber.length !==8 ) {
    return res.status(400).json({ message: 'fill all info' });
  }
  try {
  
    const existingUser = await User.findOne({ $or: [{ username }, { email }, {phoneNumber}] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this information already exists' });
    }
     const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });

    
  

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
}
