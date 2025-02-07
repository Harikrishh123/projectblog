import mongoose from "mongoose";

const connectdb = () => {
    try {
        mongoose.connect("mongodb+srv://hari_123:shhanuman@mydatabase.1had77f.mongodb.net/myapp").then(console.log("mongoose is connected"))
    } catch (error) {
        console.log(error.message)
    }
}

export default connectdb