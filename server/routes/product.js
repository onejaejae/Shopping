const express = require('express');
const multer = require('multer');
const path = require('path')

const router = express.Router();

// uploads 폴더는 root에 생성!
let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
})

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log(ext)
   
    if(ext !== '.png' && ext !== '.jpg'){
        return cb(null, false), new Error('Something went wrong');
    }
    cb(null, true);
}

const upload = multer({ 
    storage : storage,
    fileFilter : fileFilter 
}).single("file");

router.post('/image', upload, (req, res) => {
    return res.status(200).json({
        success : true,
        url : req.file.path,
        fileName : req.file.filename
    })
})

module.exports = router;