import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import styles from "./Home.module.css";
import Select from "../components/Select";
import ProductCard from "../components/ProductCard";

const categories = [
  { value: "all", label: "All categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "accessories", label: "Accessories" },
  { value: "beauty", label: "Beauty" },
];
const years = [
  { value: "new", label: "Newest" },
  { value: "lowHigh", label: "Price:Low → High" },
  { value: "highLow", label: "Price:High → Low" },
  { value: "popular", label: "Most popular" },
];
const Home = () => {
  const [category, setCategory] = useState("all");
  const [year, setYears] = useState("new");
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
          />
          <Select
            options={categories}
            className={styles.categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Select
            options={years}
            className={styles.years}
            value={year}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <ProductCard/>
      </div>
    </div>
  );
};

export default Home;
