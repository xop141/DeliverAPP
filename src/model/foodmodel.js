import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const foodSchema = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  rate: {type: Number},
  category: {type: String}
});

const Food = model('Food', foodSchema);
export default Food;
