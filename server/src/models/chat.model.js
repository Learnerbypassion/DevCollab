import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
{
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
   },
   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
   },
   text: {
      type: String,
      required: true
   }
},
{ timestamps: true }
);

const chatModel =  mongoose.model("chatModel", chatSchema);
export default chatModel