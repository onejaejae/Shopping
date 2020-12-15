import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./UserCardBlock.css"

function UserCardBlock({ products, removeItem }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

  
 
    const renderItems = () => {
     return  products && products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={ { width : '70px' } } alt="product"
                            src={`http://localhost:5000/${product.images[0]}`} 
                    />
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    $  {product.price}
                </td>
                <td>
                    <button onClick={ () => removeItem(product._id) }>
                        Remove
                    </button>
                </td>
            </tr>
        ))
    }

    return (
       <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    { renderItems() }
                </tbody>
                
            </table>

       </div>
    )
}

export default UserCardBlock
