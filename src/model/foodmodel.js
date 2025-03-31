import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const foodSchema = new Schema({
  foodName: { type: String, required: true }, // Make sure to match "foodName" with your order model
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }, // Optional: Food image
});

const Food = model('Food', foodSchema);
export default Food;
