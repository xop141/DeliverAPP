import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Order = new Schema({
  foodName: String,
  orderedFoodId: String,
  totalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'canceled', 'delivered'],
    default: 'pending',
  },
  quantity: Number,
  ordered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model (assuming "User" is the model for users)
  }
}, 
{ timestamps: true });

const FoodOrder = model('FoodOrder', Order);

export default FoodOrder;
