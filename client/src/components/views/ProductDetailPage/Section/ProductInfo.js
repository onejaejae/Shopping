import React from 'react'
import { Descriptions, Button } from 'antd';

function ProductInfo({ ProductDetail }) {
    const clickHandler = () => {
        
    }

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price">{ProductDetail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{ProductDetail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{ProductDetail.views}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>
                    {ProductDetail.description}
                </Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />

            <div style={{ display : 'flex', justifyContent: 'center'} }>
                <Button size="large" shape="round" type="danger" onClick={ clickHandler }>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
