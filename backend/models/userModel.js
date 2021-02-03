const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

//encrypting the password before saving

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password , 10);
})

// campring the password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//generating the token 
userSchema.methods.getJwtToken = function (){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET , {
        expiresIn: process.env.EXPIRE_TIME
    });
}


const User = mongoose.model('User',userSchema);
module.exports = User;