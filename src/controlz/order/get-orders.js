import Model from "../../model/orderModel.js";
import {jwtDecode} from 'jwt-decode';

const getOrder = async (req, res) => {
  try {
    // Get the token from the request headers
    const {token} = req.body

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    // Decode the token
    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.userId;



    if (!userId) {
      return res.status(400).json({ message: "Invalid token: userId is missing" });
    }

    // Find orders for the specific user by userId
    const orders = await Model.find({ userId });

    // If no orders found
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Send the orders as a response
    return res.status(200).json(orders);

  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default getOrder;
