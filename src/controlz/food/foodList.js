import Food from "../../model/foodmodel.js";
import Category from "../../model/category.js"; // Assuming you have a Category model

export const foodList = async (req, res) => {
  const params = req.params.category
try{
  if(params){
  const foods = await Food.find({category : params})
  res.send(foods)
  } else{
    const foods = await Food.find({})
    res.send(foods)
  }
  
  


} catch (error){
  console.log(error);
  
}
  
};
