const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.Register = async (req, res, next) => {

    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 200, res);
    }
    catch(error) {
        next(error);
    }
}


exports.Login = async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorResponse("please provide email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 404));
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 404));
        }

        sendToken(user, 201, res);

        
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

exports.ForgotPassword = async (req, res, next) => {
    const email  = req.body.email;

    console.log(email);
    try {
        const user = await User.findOne({ email: email});

        if(!user) {
            return next(new ErrorResponse("No user found with email " + email, 404));
            
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = 
        `<h1> you have requested reset password</h1>
         <p>please got to this link to reset your password</p>
         <a href=${resetUrl} clicktracking=off/>${resetUrl}
        `;
        try {
            await sendEmail({
                to: user.email,
                subject: 'Reset Password Request',
                text: message
            })

            res.status(200).json({ success: true, data: "Email sent"})
        } catch (error) {
           user.resetPasswordToken = undefined;
           user.resetPasswordExpire = undefined;
           await user.save(); 
            console.log(error.message);
           return next(new ErrorResponse("Email Couldn't be sent", 500));
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

exports.ResetPassword = async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

        if(!user){
            next(new ErrorResponse("Invalid Reset token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, data: "password reset success"});
    } catch (error) {
        next(error);
    }

}

const sendToken = (user, statusCode, res) => { 
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token: token})
}