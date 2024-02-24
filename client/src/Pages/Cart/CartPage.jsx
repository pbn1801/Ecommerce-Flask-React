import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartItem from '../../Components/CartItem/CartItem'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  
  
  const handleRemoveFromCart = async (productId) => {
    try {
      const token = sessionStorage.getItem('authToken')
      await axios.delete(`http://127.0.0.1:5000/remove_cart_item/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })

      const updatedCart = cartItems.filter((item) => item.product.id !== productId);
      console.log('Updated Cart:', updatedCart);
      setCartItems(updatedCart);
    } catch(error) {
      console.log("Lỗi khi xóa sản phẩm", error)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const token = sessionStorage.getItem('authToken')
        const response = await axios.get('http://127.0.0.1:5000/giohang', {
          headers: {
              Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })
        setCartItems(response.data)
        console.log(response.data)
      } catch(error) {
        console.log('Fetching error', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 style={{textAlign: "center"}} className='mt-4'>My Cart</h1>
      <CartItem products={cartItems} onRemoveFromCart={handleRemoveFromCart}/>
    </div>
  )
}

export default CartPage