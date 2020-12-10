import React, { useEffect } from 'react'
import Axios from 'axios';


function CartPage(props) {
    

    useEffect(() => {
      // user cart의 Quantity 정보, cart의 담긴 product 정보가 필요함
      const variable = {
          userId : localStorage.getItem('userId')
      }

      Axios.post('/api/users/getCart', variable)
        .then(res => {
            if(res.data.success){
                console.log(res.data)
            }else{
                alert('카트 정보를 가져오는데 실패했습니다');
            }
        })
     
    }, [])

    return (
        <div>
            CartPage
        </div>
    )
}

export default CartPage
