const crypto = require("crypto");
const User = require("../model/User");
const ErrorResponse = require("../utilties/response");
const sendEmail = require("../utilties/sendEmail")

exports.register = async (req,res,next) => {
  const {username,email,password} = req.body;

  try{
    const user = await User.create({
      username,email,password
    });

    sendToken(user, 201, res);

  } catch (error){
    next(error);
  }
}

exports.login = async (req,res,next) => {

  const {email,password} = req.body;

  if(!email || !password){
    return next(new ErrorResponse("Please provide email/password",400))
  }

  try {
    const user = await User.findOne({email}).select("+password");

    if(!user){
      return next(new ErrorResponse("Invalid credentials",401))
    }

    const isMatched = await user.matchPassword(password);

    if (!isMatched){
      return next(new ErrorResponse("Invalid credentials",401))
    }

    sendToken(user, 200, res);

  }catch (error){
    next(error);
  }
}

exports.forgotpassword = async (req,res,next) => {
  const {email} = req.body;

  try{
    const user = await User.findOne({ email });

    if (!user) {
      //brute force security practice
      return next(new ErrorResponse("Email could not be sent.", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;  //add front end domain
    const message = `
     <h1>Reset Password Request.</h1>>
     <p>Please go to this link : </p>
     <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>`;

    //clicktracking=off - doesnt re-route with 3rd party mailer

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text:message
        });

        res.status(200).json({
          success:true,
          data:"Email Sent!"
        })
      }catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new ErrorResponse("Email is not sent.", 500))
      }

  }catch (error){
    next(error);
  }
}

exports.resetpassword = async  (req,res,next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  try{
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire : { $gt: Date.now()}
    })
    if(!user){
      return next(new ErrorResponse("Invalid reset token",400))
    }
    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({
      success:true,
      data:"password reset success"
    })
  }catch (error){
    next(error);
  }
}

const sendToken = (user, statusCode,res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success:true,
    token
  })
}