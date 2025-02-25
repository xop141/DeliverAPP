import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
 phoneNumber: String


});

const User = model('User', userSchema);  

export default User;  
