import JWT from "jsonwebtoken"

 const webTokenAndSetCookie = (userId,res)=>{
    const token = JWT.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "30d"
    })


    res.cookie("JWT",token,{
        maxAge: 30*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE !== "development"
    })
}

export default webTokenAndSetCookie;

