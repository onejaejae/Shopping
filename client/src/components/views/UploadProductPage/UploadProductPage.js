import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'

const { Title } = Typography;
const { TextArea } = Input;

const contients = [
    { key : 1, value : "Africa" },
    { key : 2, value : "Europe" },
    { key : 3, value : "Asia" },
    { key : 4, value : "North America" },
    { key : 5, value : "South America" },
    { key : 6, value : "Australia" },
    { key : 7, value : "Antarctica" }
];

function UploadProductPage() {
    const [Titles, setTitles] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Contient, setContient] = useState(1);
    const [Image, setImage] = useState([]);

    const titleChangeHandler = (e) => {
        setTitles(e.target.value);
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    }

    const PriceChangeHandler = (e) => {
        setPrice(e.target.value);
    }

    const contientChangeHandler = (e) => {
        setContient(e.target.value);
       
    }

    return (
        
        <div style={{ maxWidth:'700px', margin : '2rem auto'}}>
            <div style={{ textAlign : 'center', marginBottom : '2rem' }}>
                <Title level={2}>여행 상품 업로그</Title>
            </div>
            <Form>
                {/* Drop Zone */}
                <FileUpload />

                
                <br />
                <br />
                <label>이름</label>
                <Input onChange={ titleChangeHandler } value={Titles}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={ descriptionChangeHandler }  value={ Description } />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={ PriceChangeHandler }  value={ Price } />
                <br />
                <br />
                <select onChange={ contientChangeHandler }>
                    {contients.map( contient => {
                        return <option key={ contient.key } value={contient.k} >{contient.value}</option>
                    })}
                </select>
                <br />
                <br />
                <Button>
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
