const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const Profile = require("../models/Profile")
const bcrypt = require("bcrypt")


//send OTP 
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from req ki body
        const { email } = req.body
        //check if email already exist in db
        const ifUserPresent = await User.findOne({ email });

        //if user already exists then return a response
        if (ifUserPresent) {
            return res.status(401).json({
                success: false,
                message: "user already registered"
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("Otp Generated", otp)
        //otp unique hai ki nahi check karo

        let alreadyExistingOtp = await OTP.findOne({ otp: otp })
        //agar otp exist karta hai toh bar bar generate karenge jab tak unique otp naa mil jae
        while (alreadyExistingOtp) {


            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            alreadyExistingOtp = await OTP.findOne({ otp: otp })
        }
        //db me entry bhejne ke liye ek object me sabb daal diya
        const otpPayload = { otp, email }
        //entry create kardi
        const otpEntry = await OTP.create(otpPayload)
        console.log(otpEntry)
        //successful response bhej diya
        res.status(200).json({
            message: "otp sent successfully",
            success: true,
            otp
        })
    }


    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        })

    }
}
// ques -  aisa koi package jo yeh ganda code hata pae


/////////////////////////////////////////////////////////////////////////////////////////////

//sign up

exports.signup = async (req, res) => {
    try {
        //data ko fetch karo from req ki body
        const { firstName, lastName, } = req.body
        //validate ki sabb bhara hai
        if (!firstname || !lastname) {
            res.status().json({

            })
        }

        if (password != confirmPassword) {
            return res.status().json({

            })

        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status().json({

            })

        }
        const mostRecentOpt = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        if (!mostRecentOpt) {
            return res.status().json({

            })

        }
        const profileDetails = {
            dateOfBirth: null,
            about: null,
            contactNumber: null,
            gender: null,
        }
        if (otp == mostRecentOpt.otp) {
            return res.status().json({

            })
        }
        else {

            const hashedPassword = bcrypt.hash(password, 10)
            const profile = await Profile.create(profileDetails)
            const user = await User.create({
                firstName, lastName, additionalDetails: profile._id,
                image: ``,

            })
            return res.status()
                .json({

                })
        }
    }

    catch (err) {

    }
    /////////////////////////////////////////////////////////////////////////////////////

    //Login

    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status().json({

                })
            }
            const existingUser = await User.findOne({ email })
            if (!existingUser.email) {
                return res.status().json({

                })
            }
            else {
                bcrypt.compare()
            }
        }

        catch (err) {

        }
    }







}
