import mongoose from "mongoose";

const connectingMongoDB = ()=>{
try {

    mongoose.connect(process.env.DB_URI)
    console.log("Mongo DB connected")
    
} catch (error) {
    console.log("Error in db connection",error.message);
}
}

export default connectingMongoDB