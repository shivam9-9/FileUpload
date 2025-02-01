const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req,res) => {
    try{

        const file = req.files.file;
        console.log("FILE: ", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path: ", path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.status(200).json({
            success:true,
            message:"Local file uploaded successfully"
        })


    } catch(err) {
        console.error(err);
        res.status(500).json({
            success:true,
            message:"file upload failed"
        })
    }
}

function isSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadToCloudinary(file, folder,quality){
    const options = {folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) => {
    try{
        const {name, tags , email} = req.body;
        const file = req.files.imageFile;
        console.log(name,tags,email);
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"Not a valid image file"
            })
        }

        const response = await uploadToCloudinary(file, "FLU2");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"image uploaded successfully"
        })

    } catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"internal server error in image upload"
        })
    }
}

exports.videoUpload = async (req,res) => {
    try{
        const {name, tags , email} = req.body;
        const file = req.files.videoFile;
        console.log(name,tags,email);
        console.log(file);

        const supportedTypes = ["mp4","mov"];
        
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if(!isSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"Not a valid video file"
            })
        }

        const response = await uploadToCloudinary(file, "FLU2");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"video uploaded successfully"
        })

        

    } catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"internal server error in video upload"
        })
    }
}


exports.SizeReducer = async (req,res) => {
    try{
        const {name, tags , email} = req.body;
        const file = req.files.file;
        console.log(name,tags,email);
        console.log(file);

        const supportedTypes = ["mp4","mov","jpg","jpeg","png"];
        
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"Not a valid video file"
            })
        }

        const response = await uploadToCloudinary(file, "FLU2", 30);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"image uploaded successfully"
        })

    } catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"internal server error in size reducer"
        })
    }
}
