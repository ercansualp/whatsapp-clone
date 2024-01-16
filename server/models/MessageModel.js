import mongoose from "mongoose";
const {Schema} = mongoose;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        default: "text"
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;