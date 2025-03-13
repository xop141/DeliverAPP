
import Model from "../../model/orderModel.js";


const getOrder = async(req, res) => {
try{
// const {foodname, quantity} = req.body
const orders = await Model.find()
console.log(orders);

} finally{
    console.log("all orders");
    
}



};

export default getOrder;
