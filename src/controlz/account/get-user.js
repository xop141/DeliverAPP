import { Query } from "mongoose";
import User from "../../model/usermodel.js";
export const getUser = async(req,res)=>{
    const {username, email} = req.body
    const existingUser = await User.findOne({
        $and: [
          { username },
          { email }
        ]
      });
      
   
    if (existingUser) {
      return res.status(400).json({ message: 'welcome' });
    } else{
        return res.status(400).json({message: 'wrong biatch'})
    }

}
