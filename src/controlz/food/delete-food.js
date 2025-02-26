import Food from "../../model/foodmodel.js";

export const deleteFood = async (req, res) => {
  const itemToDelete = req.body.name;

  if (!itemToDelete) {
    return res.status(400).json({ message: 'Food name is required to delete.' });
  }

  try {
    
    const deletedFood = await Food.findOneAndDelete({ foodName: itemToDelete });

    if (!deletedFood) {
 
      return res.status(404).json({ message: 'Food not found' });
    }


    return res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error, unable to delete food' });
  }
};
