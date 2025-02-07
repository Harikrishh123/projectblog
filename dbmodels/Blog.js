import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BlogSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },

    username : {
        type : String,
        required : true
    },

    title : {
        type : String,
        required : true
    },

    summary : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    }
},
{
    timestamps : true
}
)


export default mongoose.models.blog || model('blog', BlogSchema)