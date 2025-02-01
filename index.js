const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const db = require("./config/database");
db.connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Uplaod = require("./routes/FileUpload");
app.use('/api/v1/upload', Uplaod);

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
})

