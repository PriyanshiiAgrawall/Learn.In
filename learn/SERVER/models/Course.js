const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
    },

    courseDescription: {
        type: String,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,


    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
    }],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    courseCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseCategory",

    }],
    tags: {
        type: String,
        required: true,
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }]

})
module.exports = mongoose.model("Course", courseSchema)