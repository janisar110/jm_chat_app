import {Conversation} from "../models/conversation.models.js"
import { Message } from "../models/message.models.js";

export const sendMessage = async (req, res)=>{
    try {
        const { message } = req.body
        const { id:receiverId } = req.params;
        const senderId = req.user._id;
        // console.log(message,receiverId,req.user._id )
        
        let conversation = await Conversation.findOne({
            participants: {$all:[senderId, receiverId]}
        })
        // console.log(conversation)

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(200).json({
            message:"message sent successfuly",
            newMessage
        })

        
        
    } catch (error) {
        console.log("Error in send message controller",error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getMessage = async (req, res)=>{
    try {
        const { id:userToChatId } = req.params;
        const senderId = req.user._id;
        // console.log(message,receiverId,req.user._id )

        const conversation = await Conversation.findOne({
            participants: { $all:[senderId, userToChatId] }
        }).populate("messages");
        // console.log(conversation);
        if(!conversation){
            res.status(200).json([]);
            return
        }
       
        res.status(200).json(conversation.messages)
        
    } catch (error) {
        console.log("Error in get message controller",error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
