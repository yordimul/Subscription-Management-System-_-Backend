import mongoose, { Types } from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'user name is required'],
        trim: true,
        minLength:2,
        maxLength:100,

    },

    email:{
        type:String,
        required:[true ,'email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/, 'fill your email'],
    }, 

    password:{
        type:String,
        required:[true,'password required'],
        minLength:6,


    },
  





},{
    timestamps:true
}) 

const User = mongoose.model('User', UserSchema);

export default User;