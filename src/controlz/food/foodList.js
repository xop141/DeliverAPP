import Food from "../../model/foodmodel.js";
import Category from "../../model/category.js"; // Assuming you have a Category model

export const foodList = async (req, res) => {
  const filter = req.body.categoryName;  // You can modify this to define specific filters
  try {
    let categories;
    if (filter) {
      // Fetch categories that match the categoryName filter
      categories = await Category.find({ categoryName: filter });
    } else {
      // Fetch all categories if no filter is provided
      categories = await Category.find();
    }

    // If no categories are found, return a 404 response
    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    // Loop through each category and fetch the appropriate number of foods
    const categoriesWithFoods = await Promise.all(categories.map(async (category) => {
      let foods;
      if (filter) {
        // If a category filter is provided, limit the results to the provided number (e.g., 5)
        foods = await Food.find({ category: category.categoryName });
      } else {
        // If no filter is provided, fetch the number of foods based on `number` (defaulting to 10)
        foods = await Food.find({ category: category.categoryName }).limit(5);
      }

      return {
        categoryName: category.categoryName,
        foods: foods
      };
    }));

    // Return the categories with their associated foods
    return res.json(categoriesWithFoods);

  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching foods',
      error: error.message,
    });
  }
};
