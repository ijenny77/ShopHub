import React from 'react'
import Button from './Button'
import styles from './ProductCard.module.css'

const PRODUCTS = [
  {id:1 ,category:'ELECTRONICS',title:'Wireless Earbuds Pro',price:'$59.99',stock:120,inStock:true,emoji:'📱'},
  {id:2 ,category:'CLOTHING',title:'Nike Running Shoes',price:'$89.00',stock:45,inStock:true,emoji:'👟'},
  {id:3 ,category:'BOOKS',title:'Clean Code — R. Martin',price:'$24.99',stock:200,inStock:true,emoji:'📚'},
  {id:4 ,category:'ELECTRONICS',title:'Smart Watch Series 5',price:'$199.00',stock:18,inStock:true,emoji:'⌚'},
  {id:5 ,category:'ACCESSORIES',title:'Travel Backpack 40L',price:'$49.99',stock:67,inStock:true,emoji:'🎒'},
  {id:6 ,category:'ELECTRONICS',title:'USB-C Hub 7-in-1',price:'$34.99',stock:0,inStock:false,emoji:'💻'},
  {id:7 ,category:'ELECTRONICS',title:'Noise Cancelling Headphones',price:'$149.00',stock:30,inStock:true,emoji:'🎧'},
  {id:8 ,category:'BEAUTY',title:'Vitamin C Serum',price:'$19.99',stock:88,inStock:true,emoji:'🧴'},
]

const ProductCard = ({className, category,title,price,stock,emoji}) => {
  return (
    <div className={styles.cards}>
      {PRODUCTS.map((product)=>(
        <div className={styles.card} key={product.id}>
          <div className={styles.emojiCard}>
            <p className={styles.emoji}>{product.emoji}</p>
          </div>
          <div className={styles.cardText}>
            <h3 className={styles.category}>{product.category}</h3>
            <h4 className={styles.title}>{product.title}</h4>
            <h3 className={styles.price}>{product.price}</h3>
            <p className={styles.stock}>{product.stock} in stock</p>
            <Button onclick={} className={styles.addCart}>Add to cart</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard