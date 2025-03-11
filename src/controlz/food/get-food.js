import Food from "../../model/orderModel.js";

export const getFOOD = async (req, res) => {
    const { foodID } = req.params;
    
    // If foodID exists, try to find that specific food item
    if (foodID) {
        try {
            const foodshow = await Food.findById(foodID);

            if (!foodshow) {
                return res.status(404).json({
                    message: `Food item with ID ${foodID} not found`,
                });
            }

            // Send the specific food item as a response
            res.status(200).json({
                message: 'Food fetched successfully',
                data: foodshow,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching food by ID',
                error: error.message,
            });
        }
    } else {
        // If no foodID is provided, return all foods
        try {
            const filter = {};  // You can add filters here if needed
            
            const foods = await Food.find(filter);
            
            res.status(200).json({
                message: 'Foods fetched successfully',
                data: foods,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching foods',
                error: error.message,
            });
        }
    }
};
