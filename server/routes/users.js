const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require('../models/Product');

const { auth } = require("../middleware/auth");


//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart : req.user.cart,
        history : req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    // 먼저 User Collection에 해당 유저의 정보를 가져온다.
    // auth 미들웨어를 이용한다
    const userId = req.user._id;
    const productId = req.body.id

    let variable = {};
    
    User.findOne({"_id" : userId }, (err, info) => {
        if (err) return res.json({ success: false, err });

        let duplicate  = false;

        // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어있는지 확인
        info.cart.forEach(cart => {
          if(cart.id === productId){
            duplicate = true;
          }
        })

        // 상품이 이미 있을 때
        // 상품 개수만 올리면 된다
        if(duplicate){
            User.findOneAndUpdate(
                {"_id" : userId, "cart.id" : productId}, 
                // $inc 주어진 값만큼 해당 속성을 increment 해주는 기능
                // https://www.zerocho.com/category/MongoDB/post/579e2821c097d015000404dc 참고
                { $inc : {"cart.$.quantity" : 1}},
                // 업데이트 된 정보의 결과값을 받기 위해
                { new : true }
            )
            .exec((err, userInfo) => {
                console.log(userInfo)
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true,
                    userInfo : userInfo.cart
                });
            })
        }
        // 상품이 없을 때
        else{
            const variable = {
                id : productId,
                quantity : 1,
                date : Date.now()
            }
            
            // set으로 할 경우 다른 상품을 업데이트 할 경우, 배열의 인덱스를 덮어 쓰기 때문에 push 사용
            // 
            User.findOneAndUpdate(
                {"_id" : userId }, 
                { $push : { cart : variable } },
                { new : true }
            )
            .exec((err, userInfo) => {
                console.log(userInfo)
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true,
                    userInfo : userInfo.cart
                });
            })
        }
    })
})

router.get('/removeFromCart', auth, (req, res) => {
    // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
    const productId = req.query.id;
    const userId = req.user._id;
    
    // $pull
    // https://docs.mongodb.com/manual/reference/operator/update/pull/
    User.findOneAndUpdate(
        { "_id" : userId },
        { $pull : { cart : { id : productId }}},
        { new : true}
    )
    .exec((err, userInfo) => {
        // array = ['5fccb965901a5b10f83203e0', '5fcbda94786a2f25386b35eb'] 이런식으로 바꿔주기
        let cart = userInfo.cart;
        let array = cart.map(item => {
            return item.id
        })

        // product collection에서 현재 남아있는 정보를 가져오기
        Product.find({"_id" : { $in : array }})
            .populate('writer')
            .exec((err, productInfo) => {
                if(err) return res.status(400).send(err);

                return res.status(200).json({
                    productInfo,
                    cart
                })
            })
    })

})

module.exports = router;
