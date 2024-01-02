import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import conn from "./db.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

// connect to the db
conn();

// initialize app
const app = express();

const corsOptins = {
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    credentials: true
}

// cors policy
app.use(cors(corsOptins))
app.use(express.json());
app.use(cookieParser());

// use images
app.use('/avatars', express.static('avatars'));

// routes
app.use("/user", userRoute);
app.use("/message", messageRoute);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:" + process.env.CLIENT_PORT,
        methods: ["GET", "POST"]
    }
});
/*
io.on("connection", (socket) => {
    const checkIsUserStillOnline = (_id) => {
        let online = false;
        for (const [key, value] of io.sockets.adapter.rooms) {
            if(key === _id) {
                if(value.size !== 1) online = true;
                break;
            }
        }
        return online;
    }

    socket.on("join_room", (_id) => {
        socket.join(_id);
        io.sockets.emit("receive_online", _id);
    });
    socket.on("send_message", (data) => {
        socket.to(data.recipient).emit("receive_message", data.message);
    });
    socket.on("typing_message", (data) => {
        socket.to(data.recipient).emit("receive_typing_message", {sender: data.sender, value: data.value});
    });

    socket.on("left_room", (_id) => {
        if(!checkIsUserStillOnline(_id)) io.sockets.emit("receive_offline", _id);
    });

    socket.on("is_online", (data) => {
        let online = false;
        for (const [key, value] of io.sockets.adapter.rooms) {
            if(key === data._id) {
                online = true;
                break;
            }
        }
        socket.emit("receive_isContactOnline", {...data, online});
    })
    socket.on('disconnect', function () {
        const rooms = Object.fromEntries(io.sockets.adapter.rooms);
        io.sockets.emit('receive_disconnect', rooms);
    });
});
*/

const socketRooms = {}; // Kullanıcıların odalarını saklamak için bir nesne

io.on('connection', function (socket) {
    socket.on('join_room', function (_id) {
        socket.join(_id);

        // Kullanıcıyı odasına ilişkilendir
        socketRooms[socket.id] = _id;

        // Kullanıcı bağlandığında
        io.sockets.emit('receive_online', _id);

        // Kullanıcı bağlantısı kesildiğinde
        socket.on('disconnect', function () {
            if(!Object.fromEntries(io.sockets.adapter.rooms)[socketRooms[socket.id]]) {
                io.sockets.emit("receive_disconnect", {_id, date: new Date()});
                delete socketRooms[socket.id];
            }
            io.sockets.emit("receive_typing_message", {sender: _id, value: false});
        });

        socket.on("typing_message", (data) => {
            socket.to(data.recipient).emit("receive_typing_message", {sender: data.sender, value: data.value});
        });

        socket.on("left_room", (data) => {
            io.sockets.emit("receive_offline", {_id: data._id, date: data.date});
        });

        socket.on("send_message", (data) => {
            socket.to(data.recipient).emit("receive_message", data.message);
        });

        socket.on("is_online", (_id) => {
            let online = false;
            for (const [key, value] of io.sockets.adapter.rooms) {
                if(key === _id) {
                    online = true;
                    break;
                }
            }
            socket.emit("receive_isContactOnline", {_id, online});
        })
    });
});

server.listen(process.env.SERVER_PORT, () => {});

//app.listen(process.env.SERVER_PORT, () => {})