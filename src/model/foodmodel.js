import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const foodSchema = new Schema({
    foodName: String,
    price: Number,
    ingredients: String,
  
 
},
{ timestamps: true });

const Food = model('Food', foodSchema);  

export default Food;  
