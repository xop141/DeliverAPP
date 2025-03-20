import Food from "../../model/foodmodel.js";

export const getFOOD = async (req, res) => {
    const { foodID } = req.params;
    

    if (foodID) {
        try {
            const foodshow = await Food.findById(foodID);

            if (!foodshow) {
                return res.status(404).json({
                    message: `Food item with ID ${foodID} not found`,
                });
            }

     
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
            
            res.json(foods)
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching foods',
                error: error.message,
            });
        }
    }
};
