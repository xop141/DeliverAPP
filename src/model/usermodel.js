import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    orders: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: 'Food' },  // Referencing Food model
        foodName: String,
        quantity: { type: Number, default: 1 },
        price: Number,  // Optional, if you want to track the price in the order
      }
    ], // Array of ordered food items with quantity
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User; // This ensures you export the User model correctly
