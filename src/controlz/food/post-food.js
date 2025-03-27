
import Food from "../../model/foodmodel.js";

export const postFood = async(req, res) => {
  const { foodName, price, ingredients, category } = req.body;
  
  const data = req.body


  
  // if (!foodName || !price || !ingredients || !category) {
  //   return res.status(400).json({ message: 'fill all info' });
  // }
 try{
  
  
  await Food.insertMany(data);
//     const existingFood = await Food.findOne({foodName})
//     if (existingFood) {
//         return     res.status(201).json({
//             message: 'food already created ',
//           });
//     }
//     const fooddata = new Food(data.map((asd)=>asd))
//     await fooddata.save()
//     res.status(201).json({
//         message: 'food created successfully',
//       });
//  } catch (error){
//     console.log(error);
//  }
}
finally{
  console.log("done");
  
}
}