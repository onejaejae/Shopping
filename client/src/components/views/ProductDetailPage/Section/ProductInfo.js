import React from 'react'
import { Descriptions, Button } from 'antd';
import  { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../../../../_actions/user_actions'
import { message } from 'antd';
// props에 부모 컴포넌트에서 준 ProductDetail 데이터가 있어서 props 속성에  match / location / history 속성이 없어짐
// withRouter를 사용해 match / location / history를 사용할 수 있게 
// https://muang-kim.tistory.com/57
import { withRouter } from 'react-router-dom';

function ProductInfo( props ) {
    console.log(props.ProductDetail)
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user)

    const clickHandler = () => {
        // 로그인 안한 유저가 누를 경우
        if(!userData.isAuth){
            message.error('로그인을 해주세요');
            setTimeout(() => {
                props.history.push('/login');
            }, 3000);
        }

        // 필요한 정보를 Cart 필드에 넣는다
        dispatch(AddToCart(props.ProductDetail._id))
    }

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price">{props.ProductDetail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.ProductDetail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.ProductDetail.views}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>
                    {props.ProductDetail.description}
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

export default withRouter(ProductInfo);
