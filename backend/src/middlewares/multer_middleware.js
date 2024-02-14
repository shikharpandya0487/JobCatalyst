const multer = require("multer");

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        // upload the files in the upload folder
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    } 
});

const upload =multer({
    storage:imgconfig
})

module.exports = upload; 