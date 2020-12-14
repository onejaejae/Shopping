import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCartBlock from './Sections/UserCardBlock'


function CartPage() {
    const [Total, setTotal] = useState(0);

    const user = useSelector(state => state.user);
    console.log("user",user)
    const dispatch = useDispatch();
    let sum = 0;

    useEffect(() => {
        let cartItems = [];
      
        // 리덕스 User State를 이용해 유저의 cart안에 상품이 있는지 확인
        // foreach vs map 
        // map은 배열의 각 요소에 대해 callback을 실행하고 실행결과를 모은 '새 배열'을 리턴한다.
       if(user.userData && user.userData.cart.length > 0){
          user.userData.cart.forEach((item => {
              cartItems.push(item.id)
          }))

          dispatch(getCartItems(cartItems, user.userData.cart))
            .then(res => {
                calculateTotal(res.payload)
            })
       }else if(user.userData && user.userData.cart.length == 0){
            setTotal(0)
       }
    
    }, [user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotal(total)
    }

    return (

        <div style={{ width:'85%', margin:'3rem auto'}}>
                <h1>My Cart</h1>
            <div>
                <UserCartBlock products={user.cartDetail && user.cartDetail} />
            </div> 

            <div style={{ marginTop : '3rem'}}>
               <h2>Total Amount : ${Total}</h2>
            </div>
            
        </div>
    )
}

export default CartPage



