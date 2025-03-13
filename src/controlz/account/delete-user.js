import User from "../../model/usermodel.js";


export const deleteUser = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {

        const result = await User.deleteOne({ username });

       
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
