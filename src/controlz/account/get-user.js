import User from "../../model/usermodel.js";

export const getUser = async (req, res) => {
  const {username, email} = req.body

// const id = req.params.id


    
    const existingUser = await User.findOne({
        $and: [
          { username },
          { email },
   
       
        ]
      });
 
   
    if (existingUser) {
        return res.send( `Welcome: ${existingUser.id}`)
        } else{
        return res.status(400).json({message: 'not that welcome'})
    }


}
