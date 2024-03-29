import bcrypt from "bcryptjs"
import User from "../models/user.models.js"
import webTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res)=>{
   try {
    const { fullName, username, password, confirmPassword  } =  req.body

   //field missing eror
    if(!fullName || !username || !password){
        res.status(400).json({
            message:"Required field are missing"
        })
        return
    }

    
    //password confirmation error
    if(password !== confirmPassword){
        res.status(400).json({
            message:"Password does not match!"
        })
        return
    }


    //user already exist error
    const userExists = await User.findOne({username})
    // console.log(userExists)
    if(userExists){
        res.status(401).json({
            message:"User name already taken"
        })
        return
    }

    const hashPassword = await  bcrypt.hash(password, 10);

    const obj =  {
        fullName,
        username,
        password:hashPassword
    }

    const userData = await User.create(obj);
    //webTokenSetCookie
    webTokenAndSetCookie(userData._id,res);

    if(userData){
        res.status(200).json({
            message:"Signup successfully",
            data: { 
                _id: userData._id,
                fullName: userData.fullName,
                username: userData.username
            }
        })
    }
    else{
        res.status(400).json({
            message:"Something went wrong!"
        })
    }

   } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({
        message: "Internal server error"
    })
   }
}

export const login = async (req, res)=>{
    try {
        const { username, password  } =  req.body;

       //field missing eror
        if( !username || !password ){
            res.status(400).json({
                message:"Required field are missing"
            })
            return
        }

        //user not found error
        const userExists = await User.findOne({username})
        if(!userExists){
            res.status(401).json({
                message:"User not found"
            })
            return
        }

        //password check error
        const comparePassword =  bcrypt.compare(password, userExists.password);
        if(!comparePassword){
            res.status(400).json({
                message:"Invalid password"
            })
            return
        }
        //webTokenSetCookie
        webTokenAndSetCookie(userExists._id,res);

        res.status(200).json({
            message:"Login successfully",
            data: { 
                _id: userExists._id,
                fullName: userExists.fullName,
                username: userExists.username
            }

        })


       } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({
            message: "Internal server error"
        })
       }
}

export const logout = async (req, res)=>{
    try {

        res.cookie("JWT","",{
            maxAge:0
        })
        res.status(200).json({
            message:"Logout successfully"
        })


    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
