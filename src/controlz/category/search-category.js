import express from 'express';
import Food from '../../model/foodmodel.js';

const getCategory = async (req, res) => {
  const { category } = req.params; 
console.log(category);

  try {

    const foods = await Food.find({ category });


    if (foods.length === 0) {
      return res.status(404).json({ message: `No foods found in the category: ${category}` });
    }

    
    res.status(200).json(foods);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Send a 500 response for any server-side errors
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


export default getCategory;
