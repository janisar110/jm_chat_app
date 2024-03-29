import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messagesRoutes from "./routes/messages.routes.js"
import usersRoutes from "./routes/users.routes.js"
import connectingMongoDB from "./db/connectionDB.js";
import cookieParser from "cookie-parser";
const app = express()
dotenv.config();
const port = process.env.PORT || 5000;



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);


// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
    connectingMongoDB()
    console.log(`Example app listening on port ${port}!`)
})