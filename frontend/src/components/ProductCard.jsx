import React from 'react'
import Button from './Button'
import styles from './ProductCard.module.css'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ products = [] }) => {
  const navigate = useNavigate()

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
        <div className={styles.card} key={product.id}>
          <div className={styles.emojiCard}>
            <p className={styles.emoji}>{product.emoji}</p>
          </div>
          <div className={styles.cardText}>
            <h3 className={styles.category}>{product.category}</h3>
            <h4 className={styles.title}>{product.title}</h4>
            <h3 className={styles.price}>${product.price.toFixed(2)}</h3>
            <p className={styles.stock}>{product.stock} in stock</p>
            <Button onClick={() => navigate('/cart')} className={styles.addCart}>
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard
