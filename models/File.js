const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags:{
        type: String,
    },
    email: {
        type: String
    }
});

fileSchema.post("save", async function(doc){
    try{
        console.log("DOC: ",doc);

        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: `Shivam Dubey`,
            to: doc.email,
            subject: "new file uploaded on cloudinary",
            html:`<h2>HELLO</h2> <p> FILE UPLOADED SUCCESSFULLY ${doc.imageUrl}`
        })

        console.log("info: ", info);

    } catch(err){
        console.error(err);
        //  res.status(500).json({
        //     success:false,
        //     message:"internal server error occured while sending the mail"
        // })
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;