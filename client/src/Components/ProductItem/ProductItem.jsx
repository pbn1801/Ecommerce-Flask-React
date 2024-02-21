import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
    const { name, category, price, image } = product;
    return (
        <>
            <div className="">
                <a href='#' className='item-product'>
                    <div className="item-product-img" style={{backgroundImage: `url(${image})`}}></div>
                    <div className="name-rate-sold">
                        <h3 className="item-product-name">{name}</h3>
                        {/* <div className="rate-and-sold flex justify-start items-baseline">
                            <div className="item-product-rating">
                                {[...Array(5).keys()].map(index => (
                                    <i key={index} className={`fa-solid fa-star ${index < rating ? 'star-gold' : 'star-gray'}`}></i>
                                ))}
                            </div>
                            <div className="item-product-sold">Đã bán {sold}</div>
                        </div> */}
                    </div>
                    <div className="item-product-price">
                        <span className="item-product-price-current">{price}<sup>đ</sup></span>
                        {/* <span className="item-product-price-discount">-{discount}%</span> */}
                    </div>
                    {/* <div className="item-product-delivery">{delivery}</div> */}
                    <div className="item-product-categories">{category}</div>
                    <button className='addToCart'>Add to cart</button>
                </a>
            </div>
        </>
    )
}

export default ProductItem;

// import './style.css';
// import React from 'react';
// // import { Link } from 'react-router-dom';

// function ProductItem({ product }) {
//     const { name, rating_average, list_price } = product;
//     const base_url = product.images[0]?.base_url; // Truy cập vào base_url trong object con images[0]
//     const quantitySoldText = product.quantity_sold?.text
//     const name_categorie = product.categories?.name
//     const discount = Math.floor(Math.random() * 100) + 1
//     return (
//         <>
//             <div className="row">
//                 <div className='product__item'>
//                     <div className="product__item-img" style={{backgroundImage: `url(${base_url})`}}></div>
//                     <div className="name-rate-sold">
//                         <h3 className="product__item-name">{name}</h3>
//                         <div className="rate-and-sold">
//                             <div className="product__item-rating">
//                                 {[...Array(5).keys()].map(index => (
//                                     <i key={index} className={`fa-solid fa-star ${index < rating_average ? 'star-gold' : 'star-gray'}`}></i>
//                                 ))}
//                             </div>
//                             <div className="product__item-sold">{quantitySoldText}</div>
//                         </div>
//                     </div>
//                     <div className="product__item-price">
//                         <span className="product__item-price-current">{list_price}<sup>đ</sup></span>
//                         <span className="product__item-price-discount">-{discount}%</span>
//                     </div>
//                     {/* <div className="product__item-delivery text-center mt-6 pt-2">{delivery}</div> */}
//                     <div className="product__item-categories">{name_categorie}</div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ProductItem;
