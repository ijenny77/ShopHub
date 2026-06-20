import React,{useState,useEffect} from "react";
import { getProducts,createProduct,updateProduct,deleteProduct } from "../api/index";
import Navbar from "../components/Navbar";
import styles from "./AdminProducts.module.css";
import toast from 'react-hot-toast'

const AdminProducts = () => {
    const [products,setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingProduct,setEditingProduct] = useState(null)
    const [form,setForm] = useState({
        name:"",description:"",price:"",category:"",image:"",stock:""
    })
    useEffect(()=>{
        getProducts().then(res => setProducts(res.data.products))
    },[])
    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            Object.entries(form).forEach(([key, val]) => data.append(key, val))
            if (editingProduct) {
              await updateProduct(editingProduct._id, data)
              toast.success('Product updated')
            } else {
              await createProduct(data)
              toast.success('Product added')
            }
            const res = await getProducts()
            setProducts(res.data.products)
            setShowForm(false)
            setEditingProduct(null)
            setForm({name:"",description:"",price:"",category:"",image:"",stock:""})
        }catch{
            toast.error('Something went wrong')
        }
    }
    const handleDelete = async (id) => {
        if(!window.confirm("Delete this product?")) return;
        await deleteProduct(id)
        setProducts(products.filter(p => p._id !== id));
        toast.success('Product deleted')
    }
    const handleEdit = (product) => {
        setEditingProduct(product)
        setForm({
            name:product.name,
            description:product.description,
            price:product.price,
            category:product.category,
            image:product.image,
            stock:product.stock,
        })
        setShowForm(true);
    }
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Manage Products</h2>
                    <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setForm({name:"",description:"",price:"",category:"",image:"",stock:""}); setShowForm(true); }}>
                        + Add Product
                    </button>
                </div>

                {showForm && (
                    <div className={styles.formWrapper}>
                        <h3 className={styles.formTitle}>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.grid}>
                                <input className={styles.input} name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                                <input className={styles.input} name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                                <input className={styles.input} name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
                                <input className={styles.input} name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
                                <input className={styles.input} name="image" type="file" accept="image/*" onChange={(e) => setForm({...form,image:e.target.files[0] })}/>
                                <input className={`${styles.input} ${styles.fullWidth}`} name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                            </div>
                            <div className={styles.formActions}>
                                <button className={styles.submitBtn} type="submit">{editingProduct ? "Update" : "Add"} Product</button>
                                <button className={styles.cancelBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr><td colSpan={6} className={styles.empty}>No products found.</td></tr>
                            ) : (
                                products.map(p => (
                                    <tr key={p._id}>
                                        <td><img className={styles.img} src={p.image} alt={p.name} /></td>
                                        <td>{p.name}</td>
                                        <td>{p.category}</td>
                                        <td>${p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <button className={styles.editBtn} onClick={() => handleEdit(p)}>Edit</button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(p._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;