const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const catchAsynErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');

const isAuthenticatedUser = catchAsynErrors (async (req, res, next) => {
    const { token } = req.cookies
    //console.log(token);
    if(!token) {
        return next(new ErrorHandler('Please Login',401))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id)
    next();
})

const authRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} doest not have access to this resource`,403));
        }
        next();
    }
}

module.exports = {isAuthenticatedUser, authRoles}