import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { Contients } from './Sections/Datas';


function LandingPage() {

    const [Products, setProducts] = useState([]);

    // mongoose의 skip, limit을 이용하기 위해 state 선언
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);

    // 더보기 버튼이 게시물이 8개 이상 될때만 보여주기 위해 state 선언
    const [PostSize, setPostSize] = useState(0);

    // 필터 state : continents, price
    const [Filters, setFilters] = useState({
        continents : [],
        price : []
    });

    

    const getProduct = (variable) => {
        Axios.post('/api/product/products', variable)
        .then(res => {
            if(res.data.success){
                if(variable.loadMore){
                    // # 방법 1
                    // 서버에서 받아온 데이터가 여러개이므로 ...를 사용
                    setProducts([...Products, ...res.data.products]);

                    // # 방법 2
                   // setProducts(Products.concat(res.data.products));
                }else{
                    setProducts(res.data.products);
                }
             
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

    const renderCards = Products.map((product, index) => {
    // 24를 기준으로 화면이 가장 클때, 한 카드당 6을 차지 => 4개의 카드
    // 화면이 중간일때, 카드 당 8 => 3개
    // 화면이 가장 작을 때, 카드 하나의 24 => 1개
    return<Col lg={6} md={8} xs={24}  key={ index }>
               <Card
                   cover={ <ImageSlider images={product.images}/> }
               >
                   <Meta 
                       title={product.title}
                       description={`$${product.price}`}
                   />
               </Card>
           </Col>
    })

    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        console.log(Filters)

        let variable = {
            Skip : skip,
            Limit,
            loadMore : true,
            newFilters : Filters
        }
    
        getProduct(variable);
        setSkip(skip);
    }

    const showFilterResults = ( newFilters ) => {
        //  Skip을 0으로 초기화 해야한다!
        //  카테고리를 선택할때마다 Skip을 0으로 해야 첫번째 인덱스부터 자료를 가져오기 때문
        let variable = {
           Skip : 0,
           Limit,
           newFilters
        }


        getProduct(variable);
        setSkip(0);
        setFilters(newFilters)
    }

    // CheckBox 컴포넌트에서 state를 받기 위한 handler
    // price 컴포넌트에서 state를 받기 위한 handler
    // category는 price와 checkbox를 구분하기 위한 parameter
    const handleFilter = ( Filter, Category ) => {
       
        const newFilters = { ...Filters };
        newFilters[Category] = Filter;
        console.log(newFilters)
        showFilterResults(newFilters);

    }

  

    return (
      <div style={ {  width : '75%' , margin : '3rem auto' }}>
          <div style={{ textAlign : 'center'}}>
                <h2>Let`s Travel Anyware<Icon type="shopping" /></h2>
          </div>

            {/*   Filter   */}
            
            {/*    CheckBox     */}
            <CheckBox ContientsList={ Contients } handleFilter={ handleFilter }/>

            {/*     RadioBox     */}

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
