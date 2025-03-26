import Model from "../../model/orderModel.js";

const getOrder = async (req, res) => {
  try {
    // Get the userId directly from the request body sent from frontend
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders for the specific user by the userId
    const orders = await Model.find({ ordered: userId }).populate('ordered', 'name email');

    // If no orders found
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Send the orders as a response
    return res.status(200).json(orders);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default getOrder;
