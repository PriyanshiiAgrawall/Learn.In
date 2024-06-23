const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/User");

exports.auth = async (req, res, next) => {

    try {
        //extract token
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer ", "");
        //if token is not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing",
            });
        }
        //verify the token
        try {
            const decode = await jwt.verify(token, process.env.SECRET_KEY);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            //verification issue
            return res.status(401)
                .json({
                    success: false,
                    message: "token is invalid",

                });
        }
        //next middleware par chale jao
        next();

    }

    catch (err) {
        return res.status(401)
            .json({
                success: false,
                message: "Something went wrong while validating the token",


            })

    }


}
//isStudent 

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students",

            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified, please try again",
        });
    }
}

//isInstructor


exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.role !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for instructors",

            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified, please try again",
        });
    }
}

//isAdmin 

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin ") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin ",

            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified, please try again",
        });
    }
}




