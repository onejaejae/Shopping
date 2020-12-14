import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';

function CartPage() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

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
       }
    
    }, [user.userData])

    return (
        <div>
            CartPage
        </div>
    )
}

export default CartPage



