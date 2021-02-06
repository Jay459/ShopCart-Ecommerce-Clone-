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

exports.getUserProfile = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({ 
        success: true,
        user
    })
})

exports.changePassword = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('old password is incorrect'), 400)
    }
    user.password = req.body.password
    sendToken(user,200,res);
    await user.save();
})

exports.updateUserProfile = catchAsyncErrors (async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id , newUser , {
        new :true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })
})

exports.getAllUsers = catchAsyncErrors (async (req, res, next) => {
    const users = await User.find();
    if(users.length <= 0){
        return next(new ErrorHandler('No users found',400))
    }

    res.status(200).json({
        success: true,
        users
    })
})

exports.getUserById = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler('No user found',400))
    }
    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUserProfileById = catchAsyncErrors (async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id , newUser , {
        new :true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })
})

exports.deleteUserById = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler('No user found',400))
    }

    await user.remove()
    res.status(200).json({
        success: true
    })
})