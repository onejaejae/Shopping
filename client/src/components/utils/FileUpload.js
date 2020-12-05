import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload({ refreshFunc }) {
    const [ImagePath, setImagePath] = useState([]);
    const [ImageName, setImageName] = useState("");


    const ondropHandler = ( files ) => {
        let formData = new FormData();
        const config = {
            header : {'content-type' : 'mulipart/form-data'}
        }

        formData.append("file", files[0]);

        
        Axios.post('/api/product/image', formData, config)
            .then(res => {
                if(res.data.success){
                    // 원래의 이미지 데이터를 복사한 뒤, 백엔드에서 받아온 데이터를 추가
                    setImagePath([...ImagePath, res.data.url]);
                    setImageName(res.data.fileName);

                    // 부모 컴포넌트에서 ImagePath정보를 관리하여 서버에 요청한다.
                    // 부모 컴포넌트에서 서버쪽에 요청을 보낼때 필요한 정보이므로
                    refreshFunc([...ImagePath, res.data.url]);
                }else{
                    alert('파일 업로드에 실패했습니다.');
                }
            })


    }

    const imageOnclickHandler = (image) => {
        // parameter로 받아온 image를 통해 index를 알아낸다
        const currentIndex = ImagePath.indexOf(image);

        // #방법 1
        let newImagePath = [...ImagePath];
        newImagePath.splice(currentIndex, 1);
        setImagePath(newImagePath);

         // 부모 컴포넌트에서 ImagePath정보를 관리하여 서버에 요청한다.
         // 부모 컴포넌트에서 서버쪽에 요청을 보낼때 필요한 정보이므로
        refreshFunc(newImagePath)

        // #방법 2, slice를 이용해  배열의 깊은 복사를 함
        // let arr = ImagePath.slice();
        // arr.splice(currentIndex, 1);
        // setImagePath(arr)

        

    }

    return (
       <div style={{ display : 'flex', justifyContent: 'space-between'}}>
            <Dropzone 
                onDrop={ ondropHandler }
            >
            
            {({getRootProps, getInputProps}) => (
                <div 
                    style={ { 
                        width:300, height:240, border:'1px solid lightgray',
                        display:'flex', alignItems  : 'center' , justifyContent:'center'
                    }}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize: '3rem'}} />
                </div>
            )}
        </Dropzone>
        
        {ImagePath[0] &&  

        <div style={{ display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
            { ImagePath.map((image, index) => (
                <div onClick={ () => {imageOnclickHandler(image)} } key={index}>
                    <img style={{ minWidth : '300px', width : '300px', height : '240px' }}
                            src={`http://localhost:5000/${image}`}
                            alt="product"
                    />
                </div>
            ))}
        </div>}
                
      </div> 
    )
}

export default FileUpload
