import Food from "../../model/foodmodel.js";  // Ensure you are importing the correct food model

export const patchFood = async (req, res) => {
    const { foodID } = req.params;  // Get foodID from the route parameters
    const { price, foodName, ingredients } = req.body;  // Fields to update

    // Validate that at least one field is provided
    if (!price && !foodName && !ingredients) {
        return res.status(400).json({ message: "At least one field must be provided to update" });
    }

    try {
        // Find the food by ID and update the fields
        const updatedFood = await Food.findByIdAndUpdate(
            foodID,  // Use the foodID from the URL parameter
            { price, ingredients, foodName },  // Fields to update
            { new: true }  // Return the updated food document
        );



        // If the food is not found
        if (!updatedFood) {
            return res.status(404).json({ message: "Food not found" });
        }

        // Return the updated food data
        res.status(200).json({
            message: "Food data updated successfully",
            food: updatedFood,  // Return the updated food document
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating food data", error: error.message });
    }
};
