import express from "express";
import * as userController from "../controllers/userController.js";
import {checkUser} from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./avatars");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

router.post("/",checkUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/all", userController.all);
router.patch("/", userController.update);
router.post("/uploadAvatar", upload.single("file"), (req, res, next) => {
    res.send(req.file.path);
});

/*
router.route("/").
    post(userController.addUser).
    get(userController.getUser);
*/

export default router;