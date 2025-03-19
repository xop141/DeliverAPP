import FoodCategory from "../../model/category.js"; // Import the model

const createCategory = async (req, res) => {
    const categoryData = req.body; // Get category data from the request body

    try {
        const category = new FoodCategory(categoryData); // Create a new category instance
        const savedCategory = await category.save(); // Save it to the database

        console.log("Category created:", savedCategory);

        // Send success response
        res.status(201).json({
            message: "Category created successfully",
            category: savedCategory
        });
    } catch (err) {
        console.error("Error creating category:", err);

        // Send error response
        res.status(500).json({
            message: "Error creating category",
            error: err.message
        });
    }
};

export default createCategory;
