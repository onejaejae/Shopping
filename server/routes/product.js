const express = require('express');
const multer = require('multer');
const { type } = require('os');
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

router.post('/products', (req, res) => {

    // limit() 메소드는 출력하는 도큐먼트의 갯수를 제한하는 메소드 입니다. 
    // ex) orders 컬렉션의 모든 데이터를 조회, 갯수는 3개로 제한
    // db.orders.find().limit(3)

    // skip() 메소드는 출력할 데이터의 시작부분을 설정하는 메소드 입니다.
    // ex) 2개의 데이터를 생략하고, 3 번째 데이터부터 출력
    // db.orders.find().skip(2)

    Product.find()
        .populate('writer')
        .limit(req.body.Limit)
        .skip(req.body.Skip)
        .exec((err, products) => {
            if(err) return res.status(400).json({
                success : false,
                err
            })
            
            // postSize는 더보기 버튼을 보여줄지 말지 결정하기 위한 속성
           
            return res.status(200).json({
                success : true,
                products,
                postSize : products.length
            })
        })
})

module.exports = router;