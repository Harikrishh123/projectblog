import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    repassword: {
        type : String,
        required : true
    }
})

export default mongoose.models.user || model('user', userSchema)