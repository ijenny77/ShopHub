import React, { useState, useMemo,useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import styles from "./Home.module.css";
import Select from "../components/Select";
import ProductCard from "../components/ProductCard";
import { getProducts } from '../api/index.js'
import Footer from '../components/Footer';
import Hero from '../components/Hero.jsx'
import { useLocation } from "react-router-dom";

const CATEGORIES = [
  { value: "all",         label: "All categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing",    label: "Clothing" },
  { value: "books",       label: "Books" },
  { value: "accessories", label: "Accessories" },
  { value: "beauty",      label: "Beauty" },
];

const SORT_OPTIONS = [
  { value: "new",     label: "Newest" },
  { value: "lowHigh", label: "Price: Low → High" },
  { value: "highLow", label: "Price: High → Low" },
  { value: "popular", label: "Most popular" },
];

const Home = () => {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [sort,     setSort]     = useState("new");
  const [allProducts,setAllProducts] = useState([])
  const [fetchError, setFetchError] = useState(null)
  useEffect(()=>{
    getProducts()
      .then(res => setAllProducts(res.data.products))
      .catch(err => setFetchError(err.message || 'Failed to load products'))
  },[])

  const products = useMemo(() => {
    let list = [...allProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    if (category !== "all") {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (sort === "lowHigh") list.sort((a, b) => a.price - b.price);
    else if (sort === "highLow") list.sort((a, b) => b.price - a.price);
    else if (sort === "popular") list.sort((a, b) => b.stock - a.stock);

    return list;
  }, [search, category, sort,allProducts]);
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('search')
    if (q) setSearch(q)
  }, [location.search])

  return (
    <div>
      <Navbar />
      <Hero/>
      <div id="products" className={styles.mainHome}>
        <h1 className={styles.discover}>Discover Amazing Products</h1>
        <p className={styles.discoverText}>Find everything you need, delivered to your door.</p>
        <div className={styles.inputs}>
          <Input
            type="text"
            placeholder="Search products ..."
            className={styles.productSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select 
            id = 'category-select'
            options={CATEGORIES}
            className={styles.categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Select
            options={SORT_OPTIONS}
            className={styles.years}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
        {fetchError
          ? <p style={{textAlign:'center', color:'#e53e3e', marginTop:'2rem'}}>{fetchError}</p>
          : <ProductCard products={products} />
        }
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
