const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsynErrors  = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


exports.userRegister = catchAsynErrors (async (req, res, next) => {
   const  {name , email, password} = (req.body);

   const user = await User.create({
       name,
       email,
       password,
       avatar:{
            public_id:'asfsafaf',
            url:'http'
       }
   })

   sendToken(user,200 ,res);
})

exports.userLogin = catchAsynErrors (async (req, res, next) => {
    const {email , password} = (req.body);

    if(!email || !password){
        return next(new ErrorHandler("Enter Email And Password", 404));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler("Invalid Credentials"))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password"));
    }

    sendToken(user,200 ,res);
})