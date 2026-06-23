import React,{ useState , useEffect } from 'react'
import Button from './Button'
import styles from './Hero.module.css'

const items = [
  { id: 1, number: "10,000+", title: "Products" },
  { id: 2, number: "4.8★",    title: "Rating"   },
  { id: 3, number: "Free",    title: "Shipping"  },
  { id: 4, number: "24/7",    title: "Support"   },
]

const images = [
  "images/cap.jpg",
  "images/jeans.jpg",
  "images/sets.jpg",
  "images/shoes.jpg",
]
const Hero = () => {
  const [current,setCurrent] = useState(0)
  const goNext = () => {
    setCurrent((prev)=>(prev+1) % images.length)
  }
  const goPrev = () => {
    setCurrent((prev)=>(prev-1 + images.length ) % images.length)
  }
  const goTo = (index) => {
    setCurrent(index)
  }
  return (
    <div className={styles.hero}>
      <div className={styles.leftSection}>
        <p className={styles.badge}>New arrivals every week</p>
        <h2 className={styles.heading}>
          Shop Everything You <span>Love</span>
        </h2>
        <p className={styles.description}>
          Find thousands of amazing products across electronics, clothing, beauty
          and more — delivered straight to your door.
        </p>
        <div className={styles.buttons}>
          <Button className={styles.button}>Shop Now →</Button>
          <Button className={styles.button}>Browse Categories</Button>
        </div>
        <div className={styles.stats}>
          {items.map((item) => (
            <div key={item.id} className={styles.statItem}>
              <span className={styles.statNumber}>{item.number}</span>
              <span className={styles.statLabel}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.track}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Product view ${index + 1}`}
              style={{ transform: `translateX(${(index - current) * 100}%)` }}
            />
          ))}
        </div>
        <div className={styles.arrows}>
          <button onClick={goPrev}>‹</button>
          <button onClick={goNext}>›</button>
        </div>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => goTo(index)}
              className={index === current ? styles.dotActive : styles.dot}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
