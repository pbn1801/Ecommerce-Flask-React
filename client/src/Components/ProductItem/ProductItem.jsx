import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductItem({ product }) {
    const { id, name, category, price, image } = product;

    const handleAddToCart = async () => {
        try{
            const token = sessionStorage.getItem('authToken'); 
            const response = await axios.post('http://127.0.0.1:5000/themsanpham', {
                product_id:id,
                quantity: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            console.log(response.data.message) 
        } catch (error) {
            console.log('Lỗi thêm sản phẩm', error)
        }
    }
    return (
        <>
           <div className="w-20 col-md-3 col-sm-4 col-6 mb-2">
            <div className="product__item">
                <a to='#' className='product__item-link'>
                    <div className="product__item-image">
                        <img src={image} alt={name} />
                    </div>
                    <div className="product__item-info">
                        <div className="nameAndCategory">
                            <h3 className="product__item-name">{name}</h3>
                            <div className="product__item-category">Thể loại: {category}</div>
                        </div>
                        <div className="product__item-price">
                            <span className="product__item-price-current">{price}<sup>đ</sup></span>
                        </div>
                    </div>
                </a>
                <button className='product__item-button' onClick={handleAddToCart}>Add to cart</button>
            </div>
            </div>
        </>
    )
}

export default ProductItem;


