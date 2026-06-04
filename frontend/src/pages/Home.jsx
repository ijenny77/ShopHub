import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import styles from "./Home.module.css";
import Select from "../components/Select";
import ProductCard from "../components/ProductCard";

const ALL_PRODUCTS = [
  { id: 1, category: "ELECTRONICS",  title: "Wireless Earbuds Pro",         price: 59.99,  stock: 120, inStock: true,  emoji: "📱" },
  { id: 2, category: "CLOTHING",     title: "Nike Running Shoes",            price: 89.00,  stock: 45,  inStock: true,  emoji: "👟" },
  { id: 3, category: "BOOKS",        title: "Clean Code — R. Martin",        price: 24.99,  stock: 200, inStock: true,  emoji: "📚" },
  { id: 4, category: "ELECTRONICS",  title: "Smart Watch Series 5",          price: 199.00, stock: 18,  inStock: true,  emoji: "⌚" },
  { id: 5, category: "ACCESSORIES",  title: "Travel Backpack 40L",           price: 49.99,  stock: 67,  inStock: true,  emoji: "🎒" },
  { id: 6, category: "ELECTRONICS",  title: "USB-C Hub 7-in-1",              price: 34.99,  stock: 0,   inStock: false, emoji: "💻" },
  { id: 7, category: "ELECTRONICS",  title: "Noise Cancelling Headphones",   price: 149.00, stock: 30,  inStock: true,  emoji: "🎧" },
  { id: 8, category: "BEAUTY",       title: "Vitamin C Serum",               price: 19.99,  stock: 88,  inStock: true,  emoji: "🧴" },
];

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

  const products = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q));
    }

    if (category !== "all") {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (sort === "lowHigh") list.sort((a, b) => a.price - b.price);
    else if (sort === "highLow") list.sort((a, b) => b.price - a.price);
    else if (sort === "popular") list.sort((a, b) => b.stock - a.stock);

    return list;
  }, [search, category, sort]);

  return (
    <div>
      <Navbar />
      <div className={styles.mainHome}>
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
        <ProductCard products={products} />
      </div>
    </div>
  );
};

export default Home;
