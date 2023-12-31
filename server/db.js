import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "whatsapp-clone"
    }).then(() => {
    }).catch(error => {

    })
}

export default conn;