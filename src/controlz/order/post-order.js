import Model from "../../model/orderModel.js";
import foodModel from '../../model/foodmodel.js';
import jwt from 'jsonwebtoken';

const postOrder = async (req, res) => {




    
    const { id, quantity ,token } = req.body;

    // if (!id) {
    //     return res.status(400).send("Please provide a food item id.");
    // }

    try {
        const food = await foodModel.findOne({ _id: id });

        if (!food) {
            return res.status(404).send("Food item not found.");
        }

        if (!quantity) {
            return res.status(400).send("Quantity is missing.");
        }
      
        const decoded = jwt.verify(token, 'secretKey');
        const userId = decoded.userId; 
        
        const totalPrice = quantity * food.price;

        const newOrder = new Model({
            orderedFoodId: id,
            totalPrice,
            quantity,
            ordered: userId
        });

        await newOrder.save();

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
