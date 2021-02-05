const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";

    // Mongoose invalid Object ID
    if(err.name === "CastError"){
        const message = `Resource Not Found Invalid ${err.path}`;
        error = new ErrorHandler(message , 400);
    }

    // Mongoose Validation Error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(value =>{value.message})
        error = new ErrorHandler(message , 400);
    }

    //duplication error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }
    
    //JWT token errors
    if(err.name === "JsonWebTokenError"){
        const message = 'Json Web Token is invalid try Again !!!'
        error = new ErrorHandler(message , 400);
    }


    res.status(err.statuscode).json({
        success: false,
        error: err.message
    })
}