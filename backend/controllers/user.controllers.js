import User from "../models/user.models.js"
export const getUsersForChat = async (req, res)=>{
    try {

        const isUserLoggedInId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: isUserLoggedInId}}).select("-password")

        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log("Error in get user controller",error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}