import mongoose from "mongoose";
const {Schema} = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullName: {
        type: String,
        default: "-- Ercan SUALP --",
        trim: true
    },
    avatar: {
        type: String,
        default: null,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: false,
        default: "This application was created by Ercan SUALP.",
        trim: true
    }
}, {timestamps: true});

userSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;