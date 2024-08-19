const mongoose = require("mongoose");
const courseProgessSchema = new mongoose.Schema({

    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideos: [{
        tyrpe: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }]







})
module.exports = mongoose.model("CourseProgess", courseProgessSchema)