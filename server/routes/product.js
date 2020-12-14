const express = require('express');
const multer = require('multer');
const { type } = require('os');
const path = require('path')

const router = express.Router();
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

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

    let findArgs = {};

    // key는 continents, price가 된다.
    // model의 객체 property와 맞추면 편하다

    for(let key in req.body.newFilters){
        // length 값이 0보다 큰 것만 find 요소로 넣어서 찾겠다.
        // 즉, filter를 적용한 것만 찾겠다
      
        if(req.body.newFilters[key].length > 0){
            if(key === "price"){
                findArgs[key] = {
                    // Greater than equal
                    $gte: req.body.newFilters[key][0],
                    // Less than equla
                    $lte : req.body.newFilters[key][1]
                }
            }else{
                findArgs[key] = req.body.newFilters[key];
            }
        }
    }

    

    // MongoDB Text Search(본문 검색)
    // ex) db.stores.find( { $text: { $search: "java coffee shop" } } )
    // Product model을 변경해줘야 사용 가능( 자세한 것은 검색 기능 만들기 #2 9분쯤)
    // 이것의 기능을 사용하면 제목, 본문내용 포함 형식으로 데이터를 가져올 수 있다

    // $regex : "s" --> s가 포함되어있는것을 찾기 
    // $regex : "s$" --> 끝자리가 s인것을 찾기
    // $regex : "^s" --> 첫자리가 s인것을 찾기
    if(req.body.newSearchValue){
        
        findArgs.title = {
            $regex: req.body.newSearchValue
        }
    }
    
  
   
    Product.find(findArgs)
        .populate('writer')
        .skip(req.body.Skip)
        .limit(req.body.Limit)
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

router.post('/getProductDetail', (req, res) => {
    Product.findOne({"_id" : req.body.productId})
        .populate("writer")
        .exec((err, productDetails) => {
            if(err) return res.status(400).json({
                success : false,
                err
            })

            // postSize는 더보기 버튼을 보여줄지 말지 결정하기 위한 속성      
            return res.status(200).json({
                success : true,
                productDetails
            })
        })
})

router.get('/products_by_id', auth, (req, res) => {
    let productId = req.query.id;
    let ids = productId.split(',');

    Product.find({"_id" : { $in : ids }})
        .populate('writer')
        .exec((err, products) => {
            if(err) return res.status(400).send(err);
            return  res.status(200).json({
                success : true,
                products
            })
        })
})

module.exports = router;