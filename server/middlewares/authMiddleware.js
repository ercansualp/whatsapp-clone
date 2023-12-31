import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const checkUser = (req, res, next) => {
    const token = req.cookies.jsonwebtoken;
    jwt.verify(token, process.env.JWT_SECRET, async(error, decodedToken) => {
        if(error) {
            res.send(false);
        } else {
            const user = await User.findById(decodedToken._id);
            if(user) res.send(user);
            else res.send(false);
        }
        next();
    });
}