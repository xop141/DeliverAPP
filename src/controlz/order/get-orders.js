import Model from "../../model/orderModel.js";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode to decode the token

const getOrder = async (req, res) => {
  try {
    // Get the token from the request body
    const token = req.body.token;

    if (token) {
      // If token is provided, decode it
      const decoded = jwtDecode(token);

      if (!decoded || !decoded.userId) {
        return res.status(400).json({ message: "Invalid token, userId not found" });
      }

      const userId = decoded.userId;

      // Retrieve the orders for the decoded userId
      const orders = await Model.find({ userId });

      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }

      return res.status(200).json(orders);
    } else {
      // If no token is provided, fetch all orders
      const allOrders = await Model.find({});

      if (allOrders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }

      return res.status(200).json(allOrders);
    }

  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default getOrder;
