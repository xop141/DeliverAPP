import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Order = new Schema({
    totalPrice: Number,
    role: {
        type: String,
        enum: ['pending', 'canceled', 'delivered'],
        default: 'pending',
      },
  
  
 
},  
{ timestamps: true });

const FoodOrder = model('FoodOrder', Order);  

export default FoodOrder;  
