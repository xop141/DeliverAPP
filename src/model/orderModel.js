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
   
  },
  { timestamps: true }
);

// Calculate the total price of the order based on the foods and quantities
orderSchema.pre('save', function (next) {
  this.totalPrice = this.foods.reduce(
    (total, food) => total + food.quantity * food.price,
    0
  );
  next();
});

const Order = model('Order', orderSchema);

export default Order;
