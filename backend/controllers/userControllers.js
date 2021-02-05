const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors  = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.userRegister = catchAsyncErrors (async (req, res, next) => {
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

exports.userLogin = catchAsyncErrors (async (req, res, next) => {
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

exports.logout = catchAsyncErrors(async (req, res, next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message:'logged Out'
    })
})

exports.forgotPassword = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user) {
        return next(new ErrorHandler("Invalid Email",404));
    }

    const resetToken = user.resetTokenPassword();
    await user.save({validateBeforeSave:false});

    const url = `${req.protocol}://${req.get('host')}/user/password/reset/${resetToken}`

    const message = `\n\nYour token for password reset is following:\n\n${url} if you havent requested for reset password then please ignore this`

    try {

        await sendEmail({
            email: user.email,
            subject : "Shopcart Password Reset", 
            message
        })

        res.status(200).json({
            success: true,
            message: `Password sent to ${user.email}`
        })
        
    } catch (error) {
        resetPasswordToken = undefined
        resetPasswordExpiry = undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }
})

exports.resetPassword = catchAsyncErrors (async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpiry : { $gt :Date.now()}
    })
    if(!user) {
        return next(new ErrorHandler('Password reset token has been expired',400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords Doesnot Match',400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined

    await user.save();

    sendToken(user,200,res);

})