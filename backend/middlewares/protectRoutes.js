import  JWT  from "jsonwebtoken"; 
import User from "../models/user.models.js"

const protectRoutes = async (req, res, next)=>{
    try {
        const token = req.cookies.JWT;
        // console.log(token)
        if(!token){
            res.status(400).json({
                message:"Unauthorized --> Token not provided"
            })
            return
        }     
        
        const decoded =  JWT.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
        if(!decoded){
            res.status(400).json({
                message:"Unauthorized --> Invalid token"
            })
            return
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(400).json({
                message:"Unauthorized --> user not found"
            })
            return
        }
        
        req.user = user;
        
        next();

    } catch (error) {
        console.log("Error in protectRoutes middleware",error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export default protectRoutes