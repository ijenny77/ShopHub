import React from "react";
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProduct, getImageUrl } from "../api";
import { useCart } from "../context/CartContext";
import styles from './ProductDetail.module.css'
const ProductDetail = () => {
  const {id} = useParams()
  const [product,setProduct] = useState(null)
  const { addItem } = useCart()
  const navigate = useNavigate()
  useEffect(()=>{
    getProduct(id).then(res => setProduct(res.data))
  },[id])
  if(!product) return <p>Loading...</p>
  return (
    <div>
      <Navbar/>
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.emojiBox}>
            <img src={getImageUrl(product.image)} alt={product.name} className={styles.emoji} />
          </div>
          <div className={styles.info}>
            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.description}>{product.description || 'No description available.'}</p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <p className={styles.stock}>{product.stock} in stock</p>
            <button className={styles.btn} onClick={async () => {
              await addItem(product._id,1)
              navigate('/cart')
            }}>
              Add to Cart →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductDetail;
