import React, { useState, useEffect } from "react";
import { getProducts } from "../api/index";
import Navbar from "../components/Navbar";
import styles from "./AdminStock.module.css";

const AdminStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  const outOfStock = products.filter((p) => p.stock === 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const inStock = products.filter((p) => p.stock > 5);

  const filtered =
    filter === "out" ? outOfStock :
    filter === "low" ? lowStock :
    filter === "in" ? inStock :
    products;

  const getStockBadge = (stock) => {
    if (stock === 0) return <span className={styles.badgeOut}>Out of Stock</span>;
    if (stock <= 5) return <span className={styles.badgeLow}>Low Stock</span>;
    return <span className={styles.badgeIn}>In Stock</span>;
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Stock Overview</h2>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <p className={styles.statNumber}>{products.length}</p>
            <p className={styles.statLabel}>Total Products</p>
          </div>
          <div className={`${styles.statCard} ${styles.statIn}`}>
            <p className={styles.statNumber}>{inStock.length}</p>
            <p className={styles.statLabel}>In Stock</p>
          </div>
          <div className={`${styles.statCard} ${styles.statLow}`}>
            <p className={styles.statNumber}>{lowStock.length}</p>
            <p className={styles.statLabel}>Low Stock (≤5)</p>
          </div>
          <div className={`${styles.statCard} ${styles.statOut}`}>
            <p className={styles.statNumber}>{outOfStock.length}</p>
            <p className={styles.statLabel}>Out of Stock</p>
          </div>
        </div>

        <div className={styles.filters}>
          <button className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={`${styles.filterBtn} ${filter === "in" ? styles.active : ""}`} onClick={() => setFilter("in")}>In Stock</button>
          <button className={`${styles.filterBtn} ${filter === "low" ? styles.active : ""}`} onClick={() => setFilter("low")}>Low Stock</button>
          <button className={`${styles.filterBtn} ${filter === "out" ? styles.active : ""}`} onClick={() => setFilter("out")}>Out of Stock</button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className={styles.empty}>No products found.</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className={p.stock === 0 ? styles.rowOut : p.stock <= 5 ? styles.rowLow : ""}>
                    <td><img className={styles.img} src={p.image} alt={p.name} /></td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price}</td>
                    <td><strong>{p.stock}</strong></td>
                    <td>{getStockBadge(p.stock)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStock;
