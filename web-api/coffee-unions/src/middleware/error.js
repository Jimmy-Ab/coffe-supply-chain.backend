const ErrorResponse = require('../utils/errorResponse');

const ErrorHandler = (err, req, res, next) => {
    let error  = { ...err };

    error.message = err.message;

    if(err.code === 11000){
        const message = "Duplicate field value entered";

        error = new ErrorResponse(message, 400);
    }

    if(err.name === "Validationerror"){
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error"
    });
}

module.exports = ErrorHandler;