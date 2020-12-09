import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage({ ProductDetail }) {
   const [Image, setImage] = useState([])

   useEffect(() => {

     if(ProductDetail.images && ProductDetail.images.length > 0){
        let images = [];

        ProductDetail.images.map(image => {
          return  images.push({
                original : `http://localhost:5000/${image}`,
                thumbnail : `http://localhost:5000/${image}`
            })
        })
        setImage(images);
     }
   }, [ProductDetail])

    return (
        <div>
            <ImageGallery items={Image} />
       </div>
    )
}

export default ProductImage
