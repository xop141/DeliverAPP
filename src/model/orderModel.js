import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencing the User model
    foods: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true }, // Referencing the Food model
        foodName: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 }, // Quantity of the food
        price: { type: Number, required: true }, // Price per unit of the food
      }
    ], 
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'cancelled'], 
      default: 'pending' // Default status is 'pending'
    }
  },
  { timestamps: true }
);

// Remove the pre-save hook for calculating totalPrice

const Order = model('Order', orderSchema);

export default Order;
