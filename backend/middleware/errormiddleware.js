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

    res.status(err.statuscode).json({
        success: false,
        error: err.message
    })
}