import Order from "../../model/orderModel.js";
import Food from "../../model/foodmodel.js"; 
import {jwtDecode} from 'jwt-decode';
export default async function postOrder(req, res) {
   
    
  const { userId, foods } = req.body; // foods: array of objects with { foodId, quantity }

   
  try {
    // const decodedToken = jwtDecode(token);
    // const userId = decodedToken?.userId;
    const orderItems = [];

    for (let foodItem of foods) {
      const { foodId, quantity } = foodItem;

      // Find the food item by foodId
      const food = await Food.findById(foodId);

      if (!food) {
        return res.status(404).json({ message: `Food item with ID ${foodId} not found` });
      }

      // Add the food details to the orderItems array
      orderItems.push({
        foodId: food._id,
        foodName: food.foodName,   // Assuming you have a 'foodName' in your Food model
        quantity,
        price: food.price          // Assuming you have a 'price' in your Food model
      });
    }

    // Now, create the order with the array of order items
    const newOrder = new Order({
      userId,
      foods: orderItems,
    });

    await newOrder.save();

    return res.status(201).json({ message: 'Order placed successfully', data: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: 'Error placing order' });
  }
};
