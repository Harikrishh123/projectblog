import mongoose from "mongoose";

const connectdb = () => {
    const MONGODB_URI = process.env.MONGO_URI;
    try {
        mongoose.connect(MONGODB_URI).then(console.log("mongoose is connected"))
    } catch (error) {
        console.log(error.message)
    }
}

export default connectdb