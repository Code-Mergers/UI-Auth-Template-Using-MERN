const ErrorResponse = require("../utilties/response");

const errorHandler = (err,req,res,next) => {
    let error = {...err};

    error.message = err.message;

    //checking for duplicate error key
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message,400);
    }

    //checking for validation error - (making array of nested objects)
    if(err.name === "ValidationError"){
        const message = Object.value(err.errors).map((val) => val.message);
        error = new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || "Server Error"
    });
}

module.exports = errorHandler;