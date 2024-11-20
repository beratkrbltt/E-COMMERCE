import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/ProductDetails.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const { id } = useParams();

    const { products, selectedProduct } = useSelector((store) => store.product);

    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })
    }
    return (
        <div className='main'>
            <div className='image-div'>
                <img src={image} className='product-image' />
            </div>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <h1 className='price'>{price}₺</h1>
                <div className='plus-minus'>
                    <CiCirclePlus onClick={increment} /><span>{count}</span><CiCircleMinus onClick={decrement} />
                </div>
                <div>
                    <button onClick={addBasket} className='add'>Sepete Ekle</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails