import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([]);

    // mongoose의 skip, limit을 이용하기 위해 state 선언
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);

    // 더보기 버튼이 게시물이 8개 이상 될때만 보여주기 위해 state 선언
    const [PostSize, setPostSize] = useState(0);

    const getProduct = (variable) => {
        Axios.post('/api/product/products', variable)
        .then(res => {
            if(res.data.success){
                if(variable.loadMore){
                    // # 방법 1
                    setProducts([...Products, ...res.data.products]);

                    // # 방법 2
                   // setProducts(Products.concat(res.data.products));
                }else{
                    setProducts(res.data.products);
                }
                console.log(res.data.products.postSize)
                setPostSize(res.data.postSize)
            }else{
                alert('상품을 가져오는데 실패했습니다.');
            }
        })
    }
    
    useEffect(() => {

        let variable = {
            Skip,
            Limit
        }
    
        getProduct(variable);
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

    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        let variable = {
            Skip : skip,
            Limit,
            loadMore : true
        }
    
        getProduct(variable);
        setSkip(skip);
    }

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

            <br />
            { PostSize >= Limit && 
             <div style={{ display:'flex', justifyContent : 'center' }}>
                <button onClick={ loadMoreHandler }>더보기</button>
            </div>
         }
           

      </div>
    )
}

export default LandingPage
