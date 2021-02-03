const mongoose = require('mongoose');
const { default: validator } = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter the Name'],
        maxLength:[30,"Name should not exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true,'Please Enter Email'],
        validate:[validator.isEmail, 'Please Enter a valid email'],
        unique:true 
    },
    password:{
        type:String,
        required:[true,'Please Enter Password'],
        minlength:6,
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpiry:Date

})

const User = mongoose.model('User',userSchema);
module.exports = User;