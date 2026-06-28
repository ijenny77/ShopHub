import React from 'react'
import Button from './Button'
import styles from './ProductCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import { getImageUrl } from '../api/index.js'

const ProductCard = ({ products = [] }) => {
  const navigate = useNavigate()
  const {addItem}  = useCart()
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No products found.</p>
      </div>
    )
  }

  return (
    <div className={styles.cards}>
      {products.map((product) => (
        <div className={styles.card} key={product._id} onClick={()=> navigate(`/product/${product._id}`)} style={{cursor:'pointer'}}>
          <div className={styles.emojiCard}>
            <img className={styles.emoji} src={getImageUrl(product.image)}/>
          </div>
          <div className={styles.cardText}>
            <h3 className={styles.category}>{product.category}</h3>
            <h4 className={styles.title}>{product.name}</h4>
            <h3 className={styles.price}>${product.price.toFixed(2)}</h3>
            <p className={styles.stock}>{product.stock} in stock</p>
            <Button onClick={ async(e) => {
              e.stopPropagation()
              try {
                await addItem(product._id, 1)
                toast.success('Added to cart')
                navigate('/cart')
              } catch {
                toast.error('Please log in to add items to cart')
              }
              }} className={styles.addCart}>
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard
