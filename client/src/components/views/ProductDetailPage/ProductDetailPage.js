import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import ProductInfo from './Section/ProductInfo';
import ProductImage from './Section/ProductImage';
import { Row, Col } from 'antd'; 

function ProductDetailPage({ match }) {
    const { productId } = match.params;
    const [ProductDetail, setProductDetail] = useState({})
     
    useEffect(() => {
        const variable = {
            productId
        }

        Axios.post('/api/product/getProductDetail', variable)
         .then(res => {
             if(res.data.success){
                setProductDetail(res.data.productDetails)
             }else{
                 alert('상품 상세 정보를 가져오는데 실패했습니다.')
             }
         })
      
    }, [])


    return (
        <div style={{ width:'100%', padding:'3rem 4rem'}}>
            <div style={{ display:'flex', justifyContent:'center'}}>
                <h1>{ProductDetail.title}</h1>
            </div>

            <br/>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* ProductImage */}
                    
                   {/* { ProductDetail.images && <ProductImage ProductDetail={ ProductDetail }/> } */}
                   <ProductImage ProductDetail={ ProductDetail }/>
                   
                </Col>
                <Col lg={12} xs={24}>
                    {/* ProductInfo */}
                    <ProductInfo />
                </Col>
            </Row>
          


        </div>

        

    )
}

export default ProductDetailPage
