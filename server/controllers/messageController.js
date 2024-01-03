import messageModel from "../models/MessageModel.js";

export const addMessage = async (req, res) => {
    try {
        const message = await messageModel.create(req.body);
        res.send(message);
    } catch(error) {
        res.send(false);
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const query = {
            $or: [
                { sender: req.query.id1, recipient: req.query.id2 },
                { sender: req.query.id2, recipient: req.query.id1 }
            ]
        };
        await messageModel.deleteMany(query);
        res.send(true);
    } catch(error) {
        res.send(false);
    }
}

export const getMessages = async (req, res) => {
    try {
        const query = {
            $or: [
                { sender: req.headers.currentuserid, recipient: req.headers.contactid },
                { sender: req.headers.contactid, recipient: req.headers.currentuserid }
            ]
        };
        const messages = await messageModel.find(query);
        res.send(messages);
    } catch(error) {
        res.send([]);
    }
}