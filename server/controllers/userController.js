import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs-extra";

export const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.body._id,
            {lastSeen: req.body.date},
            { new: true }
        );
    } catch(error) {}
}

export const register = async (req, res) => {
    try {
        await User.create({
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password
        });
        res.send(true);
    } catch(error) {
        res.send(false);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        let same = false;
        if(user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                succeded: false,
                error: "There is no such user."
            });
        }
        if(same) {
            const token = createToken(user._id);
            res.cookie("jsonwebtoken", token, {
                withCrdentials: true,
                httpOnly: false,
                maxAge: 1000*60*60*24
            });

            res.status(200).json({
                succeded: true,
                user
            });
        } else {
            res.status(401).json({
                succeded: false,
                error: "Wrong Password!"
            });
        }
    } catch(error) {
        res.status(404).json({
            succeded: false,
            error
        });
    }
}

export const GetAllContacts = async (req, res, next) => {
    try {
        const users = await User.find().select({
            fullName: 1,
            avatar: 1,
            about: 1,
            lastSeen: 1
        });
        res.send(users);
    } catch (error) {
        res.send([]);
    }
}

export const update = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id,
            {
                avatar: req.body.avatar,
                about: req.body.about,
                fullName: req.body.fullName,
            },
            { new: true });
        if(req.body.oldAvatarPath) {
            let oldAvatarPath = req.body.oldAvatarPath.split("/");
            oldAvatarPath = oldAvatarPath[3] + "/" + oldAvatarPath[4];
            fs.removeSync(oldAvatarPath);
        }
        res.send(user);
    } catch (error) {
        res.send(false);
    }
}

const createToken = _id => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}