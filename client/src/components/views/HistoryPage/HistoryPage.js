import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Descriptions, Row, Col } from 'antd';

function HistoryPage() {
    const user = useSelector(state => state.user);
    const [History, setHistory] = useState([]);

    useEffect(() => {
        user.userData && setHistory(user.userData.history)
    }, [user.userData])

    const renderItems = () => {
      return  History.length > 0 && History.map((item, index) => (
            <tr key={index}>
                <td>
                    {item.paymentId}
                </td>
                <td>
                    {item.price}
                </td>
                <td>
                    {item.quantity}
                </td>
                <td>
                    {item.dateOfPurchase}
                </td>
            </tr>
        ))
    }
    return (
            <div style={{width:'80%', margin:'3rem auto'}}>
                <div style={{textAlign:'center'}}>
                    <h1>History</h1>
                </div>
                <br />

                <table>
                    <thead>
                        <tr>
                            <th>Payment Id</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Date of Purchase</th>
                        </tr>
                    </thead>

                    <tbody>
                        { renderItems() }
                    </tbody>
                </table>
            </div>
    )
}

export default HistoryPage
