import Food from "../../model/foodmodel.js";
import Category from "../../model/category.js"; // Assuming you have a Category model

export const foodList = async (req, res) => {
  const filter = req.body.categoryName;  
  const test = req.body.test
  try {
    let categories;
    if (filter) {

      categories = await Category.find({ categoryName: filter });
    } else {

      categories = await Category.find();
    }


    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    const categoriesWithFoods = await Promise.all(categories.map(async (category) => {
      let foods;
      if (filter) {
  
        foods = await Food.find({ category: category.categoryName })
      } else {
        
       foods = await Food.find({ category: category.categoryName }).limit(5);
      }

      return {
        categoryName: category.categoryName,
        foods: foods
      };
    }));


    return res.json(categoriesWithFoods);

  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching foods',
      error: error.message,
    });
  }
};
