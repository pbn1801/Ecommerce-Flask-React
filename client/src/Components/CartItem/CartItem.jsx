import React from 'react'
import './CartItem.css'
import remove_icon from '../Image/cart_cross_icon.png'

const CartItem = ({ products, onRemoveFromCart }) => {
    
    

    let total = products.reduce((acc, item) => (acc + (item.product.price * item.quantity)), 0)

  return (
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Products</p>
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        <div>
         {products.map((item, index) => (
            <div key={index}>
                <div className='cartitems-format'>
                    <img src={item.product.image} className='items-img'/>
                    <p>{item.product.name}</p>
                    <p>{item.product.price} VND</p>  
                    <button className='cartitems-quantity'>{item.quantity}</button>
                    <p>{item.product.price * item.quantity} VND</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => onRemoveFromCart(item.product.id)}/>
                </div>
                <hr/>
            </div>
         ))}
         <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1>Total Price</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>{total} VND</p>
                    </div>
                    <hr/>
                    <div className='cartitems-total-item'>
                        <p>Free Ship</p> 
                    </div>
                    <hr/>
                    <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>{total} VND</h3>
                    </div>
                </div>
                <button>Đặt hàng</button>
            </div>
         </div>
        </div>
    </div>
  )
}

export default CartItem