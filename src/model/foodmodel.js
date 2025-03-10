import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const foodzSchema = new Schema({
    foodName: String,
    price: Number,
    ingredients: String,
    category: String
  
 
},
{ timestamps: true });

const Food = model('Food', foodzSchema);  

export default Food;  
