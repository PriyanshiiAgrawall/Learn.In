const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const Profile = require("../models/Profile")
const bcrypt = require("bcrypt")
require("dotenv").config();

//before signup functionality otp needs to be send
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



/////////////////////////////////////////////////////////////////////////////////////////////

//sign up

exports.signup = async (req, res) => {
    try {
        //data ko fetch karo from req ki body
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        //validate that everything is filled 
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            res.status(403).json({

                success: false,
                message: "All fiels are Required"

            })
        }

        //is password and confirm password equal  
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password does not Matcch Check Again"

            })

        }
        //check if user already exist or not (checking based on email)
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Registered",

            })

        }
        //find most recent otp from the user he might have generated it multiple times
        const mostRecentOpt = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(mostRecentOtp);
        //if he has not generated we'll not find any otp in db corresponding to email
        if (!mostRecentOpt) {
            return res.status(400).json({
                success: false,
                message: "OTP not Found as It might not be generated"
            })

        }
        // to create entry in db we need additional profile details 
        const profileDetails = {
            dateOfBirth: null,
            about: null,
            contactNumber: null,
            gender: null,
        }
        //check if (most-recently)generated otp and filled otp is same
        if (otp != mostRecentOpt.otp) {
            //Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        //Valid OTP as it matched
        //hashing password
        else {

            const hashedPassword = bcrypt.hash(password, 10);
            //first we need to crete profile details entry in db to get id so that it can be referred from User
            const profile = await Profile.create(profileDetails);
            //creating entry of user in the db
            const user = await User.create({
                firstName,
                lastName,
                email,
                contactNumber,
                password: hashedPassword,
                additionalDetails: profile._id,
                image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstname}${lastName}`,

            })
            return res.status(200)
                .json({
                    success: true,
                    message: "User is registered successfully",
                    user,

                })
        }
    }

    catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: "User cannot be registered please try again",


            });

    }

}

/////////////////////////////////////////////////////////////////////////////////////

//Login

exports.login = async (req, res) => {
    try {
        //fetching data from req ki body
        const { email, password } = req.body;
        //validating if data is filled
        if (!email || !password) {
            res.status(403).json({

                success: false,
                message: "All fields are Required"

            })
        }
        //finding out if user id existing phele se
        const existingUser = await User.findOne({ email })
        //user not found
        if (!existingUser.email) {
            res.status(401).json({

                success: false,
                message: "User is not Registered please sign up first"

            })
        }
        //user found now generate jwt if entered password and db password match
        else if (await bcrypt.compare(password, existingUser.password)) {
            const payload = {
                email: existingUser.email,
                id: existingUser._id,
                role: existingUser.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            //send the token of the user to db 
            existingUser.token = token;
            existingUser.password = undefined;



            //if entered password and db password match kar jaate then cookie also created
            //creating optios to pass in cookie
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            //creating and sending cookie
            res.cookie("token", token, options).status(200).json({

                success: true,
                token,
                user,
                message: "Logged in successfully",

            })


        }
        //password didn't match
        else {
            return res.status(401).json({

                success: false,
                message: "Password is Incorrect"

            });

        };


    }


    catch (err) {
        console.log(error);
        return res.status(500).json({

            success: false,
            message: "Login Failure please try again",

        });

    }
};

//Change Password 

exports.changePassword = async (req, res) => {
    //fetch data from req ki body(oldPassword,NewPassword,ConfirmPassword)
    //validate if all fields are filled
    //check if old password matches to db password
    //if yes then update password in db
    //send mail - password updated
    //return response



} 
