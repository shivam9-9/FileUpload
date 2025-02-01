const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("db connection successfull"))
    .catch( (error) => {
        console.log("error in db connection");
        console.error(error);
        process.exit(1);
    });
};