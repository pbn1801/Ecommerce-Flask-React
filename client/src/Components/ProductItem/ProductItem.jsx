import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function ProductItem({ product }) {
    const { name, category, price, image } = product;
    // const name = product.name;
    // const category = product.category
    // const price = product.price
    // const image = product.image

    return (
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
                <button className='product__item-button'>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductItem;
