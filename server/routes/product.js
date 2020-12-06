const express = require('express');
const multer = require('multer');
const path = require('path')

const router = express.Router();
const { Product } = require('../models/Product');

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

router.post('/upload', (req, res) => {
    // 받아온 정보들을 DB에 저장한다
    const product = new Product(req.body);

    product.save( (err) => {
        if(err) return res.status(400).json({
            success : false,
            err
        })
    

        return res.status(200).json({
            success : true
        })
    })
})

router.get('/products', (req, res) => {
    Product.find()
        .populate('writer')
        .exec((err, products) => {
            if(err) return res.status(400).json({
                success : false,
                err
            })
        
            return res.status(200).json({
                success : true,
                products
            })
        })
})

module.exports = router;