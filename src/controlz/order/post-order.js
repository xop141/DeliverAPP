import Model from "../../model/orderModel.js";
import foodModel from '../../model/foodmodel.js';
import jwt from 'jsonwebtoken';

const postOrder = async (req, res) => {
    const { id, quantity, token } = req.body;

    try {
        // Find the food item by its ID
        const food = await foodModel.findOne({ _id: id });

        if (!food) {
            return res.status(404).send("Food item not found.");
        }

        if (!quantity) {
            return res.status(400).send("Quantity is missing.");
        }

        // Verify the token and extract the userId
        const decoded = jwt.verify(token, 'secretKey');
        const userId = decoded.userId;

        // Calculate the total price based on the quantity and food price
        const totalPrice = quantity * food.price;

        // Create a new order, including the food name in the order
        const newOrder = new Model({
            orderedFoodId: id,
            totalPrice,
            quantity,
            ordered: userId,
            foodName: food.foodName // Adding the food name to the order
        });

        // Save the new order to the database
        await newOrder.save();

        // Send a success response
        return res.status(201).json({ message: "Order placed successfully", data: newOrder });

    } catch (error) {
        console.error("Error occurred:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).send("An error occurred while processing the order.");
    }
};

export default postOrder;
