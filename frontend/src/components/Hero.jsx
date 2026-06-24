import React,{ useState , useEffect } from 'react'
import Button from './Button'
import styles from './Hero.module.css'
import { useNavigate } from 'react-router-dom'

const items = [
  { id: 1, number: "10,000+", title: "Products" },
  { id: 2, number: "4.8★",    title: "Rating"   },
  { id: 3, number: "Free",    title: "Shipping"  },
  { id: 4, number: "24/7",    title: "Support"   },
]

const slides = [
  {
    image:'images/cap.png',
    label:'NEW ARRIVAL',
    name:"Classic cap",
    description:'Top off your look with our premium classic cap.',
    price:24.99,
    originalPrice:39.99
  },
  {
    image:"images/jeans.png",
    label:'TRENDING NOW',
    name:"Matching Sets",
    description:"Effortlessly put-together looks for every occasion.",
    price:59.99,
    originalPrice:89.99,
  },
  {
    image: "images/sets.png",
    label: "BEST SELLER",
    name: "Matching Sets",
    description: "Effortlessly put-together looks for every occasion.",
    price: 59.99,
    originalPrice: 89.99,
  },
  {
    image: "images/bshoes.png",
    label: "HOT DEAL",
    name: "Sneaker Collection",
    description: "Step up your game with our latest sneaker drops.",
    price: 79.99,
    originalPrice: 109.99,
  },
]

const Hero = () => {
  const navigate = useNavigate()
  const [current,setCurrent] = useState(0)
  const goNext = () => {
    setCurrent((prev)=>(prev+1) % slides.length)
  }
  const goPrev = () => {
    setCurrent((prev)=>(prev-1 + slides.length ) % slides.length)
  }
  const goTo = (index) => {
    setCurrent(index)
  }
  const slide = slides[current]
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
          <Button className={styles.button} onClick={()=> document.getElementById('products').scrollIntoView({behavior:"smooth"})}>Shop Now →</Button>
          <Button className={styles.button} onClick={()=>{document.getElementById('products').scrollIntoView({behavior:'smooth'});
          setTimeout(()=>{
            document.getElementById('category-select').focus()
          },600)
          }}>Browse Categories</Button>
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
          {slides.map((s, index) => (
            <img
              key={index}
              src={s.image}
              alt={`Product view ${index + 1}`}
              style={{ transform: `translateX(${(index - current) * 100}%)` }}
            />
          ))}
        </div>
        <div className={styles.slideCard}>
          <span className={styles.slideLabel}>{slide.label}</span>
          <h3 className={styles.slideName}>{slide.name}</h3>
          <p className={styles.slideDesc}>{slide.description}</p>
          <div className={styles.slidePrices}>
            <span className={styles.slidePrice}>${slide.price.toFixed(2)}</span>
            <span className={styles.slideOriginal}>${slide.originalPrice.toFixed(2)}</span>
          </div>
          <button className={styles.slideBtn} onClick={() => navigate(`/?search=${encodeURIComponent(slide.name)}`)}>
            🛍 Shop Now
          </button>
        </div>

        <div className={styles.arrows}>
          <button onClick={goPrev}>‹</button>
          <button onClick={goNext}>›</button>
        </div>

        <div className={styles.dots}>
          {slides.map((_, index) => (
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
