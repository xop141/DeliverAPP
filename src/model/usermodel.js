import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
 phoneNumber: String,
 role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
  
}


},
{ timestamps: true });

const User = model('User', userSchema);  

export default User;  
