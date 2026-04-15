import chatModel from "../models/chat.model.js";
async function getAllChatsController(req, res) {
    try {
        const {projectId} = req.params;
    const chats = await chatModel.find({
        project: projectId
    })
    if(!chats){
        return res.status(400).json({
            message: "Don't able to find the chats",
            success: false
        });
    }
    if(chats.length === 0){
        return res.status(200).json({
            message: "No chats! Start the conversation",
            success: true
        });
    }
     res.status(200).json({
         success:true,
         chats
      })
    } catch (error) {
        res.status(500).json({
         success:false,
         message:error.message
      })
    }
}


export default {
    getAllChatsController
}