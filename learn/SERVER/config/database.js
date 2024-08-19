const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("DB connection succesfull");
        })
        .catch((err) => {
            console.log("db connection failed");
            console.log(err.message);
            process.exit(1)
        })
};


