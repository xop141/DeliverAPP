
import Food from "../../model/foodmodel.js";

export const postFood = async(req, res) => {
  const { foodName, price, ingredients } = req.body;
  if (!foodName || !price || !ingredients) {
    return res.status(400).json({ message: 'fill all info' });
  }
 try{
    const existingFood = await Food.findOne({foodName})
    if (existingFood) {
        return     res.status(201).json({
            message: 'food already created ',
          });
    }
    const fooddata = new Food(req.body)
    await fooddata.save()
    res.status(201).json({
        message: 'food created successfully',
      });
 } catch (error){
    console.log(error);
 }
}
