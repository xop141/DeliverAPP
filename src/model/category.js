import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Define the category schema
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true, // It's good practice to define required fields if applicable
  }
});

// Create the model using the schema
const FoodCategory = model('FoodCategory', categorySchema);

// Export the model
export default FoodCategory;
