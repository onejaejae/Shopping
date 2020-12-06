import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([]);
    
    useEffect(() => {
        Axios.get('/api/product/products')
            .then(res => {
                if(res.data.success){
                    console.log(res.data.products)
                    setProducts(res.data.products);
                }else{
                    alert('상품을 가져오는데 실패했습니다.');
                }
            })


    }, [])

    const renderCards = Products.map((product, index) => (
    // 24를 기준으로 화면이 가장 클때, 한 카드당 6을 차지 => 4개의 카드
    // 화면이 중간일때, 카드 당 8 => 3개
    // 화면이 가장 작을 때, 카드 하나의 24 => 1개
    <Col lg={6} md={8} xs={24}  key={ index }>
        <Card
            cover={ <ImageSlider images={product.images}/> }
        >
            <Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
    </Col>
    ))

    return (
      <div style={ {  width : '75%' , margin : '3rem auto' }}>
          <div style={{ textAlign : 'center'}}>
                <h2>Let`s Travel Anyware<Icon type="shopping" /></h2>
          </div>

            {/*   Filter   */}

            {/*   Search   */}

            {/*   Cards   */}

            {/* gutter는 여백 속성이다 */}
            <Row gutter={16}>
                { renderCards }
            </Row>

         

      </div>
    )
}

export default LandingPage
