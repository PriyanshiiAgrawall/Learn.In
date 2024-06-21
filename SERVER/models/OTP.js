const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
})

async function sendVerificationMail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification email from StudyNotion", otp)
        console.log("email sent successfully", mailResponse)
    }
    catch (err) {
        console.log("error occured while sending verification mail", err.message)
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationMail(this.email, this.otp);
    next()
})














module.exports = mongoose.model("OTP", OTPSchema)