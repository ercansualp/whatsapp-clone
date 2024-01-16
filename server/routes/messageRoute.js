import express from "express";
import * as messageController from "../controllers/messageController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./photosAndVideos");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

router.post("/", messageController.addMessage);
router.delete("/", messageController.deleteMessage);
router.get("/", messageController.getMessages);
router.post("/uploadPhotosAndVideos", upload.array("file"), (req, res, next) => {
    console.log("files: ", req.files);
    res.send(req.files);
});

export default router;