const cloudinary = require("cloudinary").v2;
const fs = require('fs/promises');

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)
        return null;
        console.log(localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath,{ resource_type: 'auto' });

        console.log("File is uploaded on Clodinary",response.url);
        await fs.unlink(localFilePath)

        return response;

    } catch (error) {
        await fs.unlink(localFilePath);

        console.log("error uploading file to cloudinary",error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }    
}

module.exports = uploadToCloudinary;