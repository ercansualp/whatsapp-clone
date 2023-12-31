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
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    socket.on("send_message", (data) => {
        socket.to(data.recipient).emit("receive_message", data.message);
    });
    socket.on("typing_message", (data) => {
        console.log("data: ", data);
        socket.to(data.recipient).emit("receive_typing_message", {sender: data.sender, value: data.value});
    });
});

server.listen(process.env.SERVER_PORT, () => {});

//app.listen(process.env.SERVER_PORT, () => {})