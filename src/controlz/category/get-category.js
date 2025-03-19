import allCategory from "../../model/category.js";

const getCategory = async (req, res) => {
    console.log("Fetching categories...");

    try {
        const categories = await allCategory.find({});
        console.log("Categories fetched successfully:", categories);
        
        // Send the categories back as a response
        res.status(200).json(categories); // Sends the categories as a JSON response
    } catch (err) {
        console.error("Error fetching categories:", err);

        // Send an error response
        res.status(500).json({
            message: "Error fetching categories",
            error: err.message
        });
    }
};

export default getCategory;
