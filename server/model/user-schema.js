import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    username:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20,
        index:true,
        lowercase:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    phone: {
        type:String,
        required:true,
    }

});

const User = mongoose.model('user',userSchema);

export default User;