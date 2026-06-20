import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import styles from "./Profile.module.css";
import { useState } from "react";
import { updateMe } from "../api/index";
import toast from 'react-hot-toast'
const Profile = () => {
    const { user, setUser, logout } = useAuth()
    const [editing,setEditing] = useState(false)
    const [form,setForm] = useState({name:'',email:'',password:''})
    const handleEditClick = () => {
        setForm({name:user.name,email:user.email,password:''})
        setEditing(true)
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        try{
            const res = await updateMe(form)
            setUser(res.data.user)
            toast.success('Profile updated')
            setEditing(false)
        }catch{
            toast.error('Failed to update profile')
        }
    }
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

    return (
        <div>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.card}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>{initials}</div>
                        <div>
                            <h2 className={styles.name}>{user?.name}</h2>
                            <span className={styles.badge}>{user?.role === 'admin' ? 'Admin' : 'Customer'}</span>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <p className={styles.fieldLabel}>Full Name</p>
                            <p className={styles.fieldValue}>{user?.name}</p>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.fieldLabel}>Email</p>
                            <p className={styles.fieldValue}>{user?.email}</p>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.fieldLabel}>Account Type</p>
                            <p className={styles.fieldValue}>{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                        </div>
                    </div>
                    {!editing ? (
                        <button onClick={handleEditClick} className={styles.editBtn}>Edit Profile</button>
                    ) : (
                        <form onSubmit={handleUpdate} className={styles.editForm}>
                            <input
                                className={styles.editInput}
                                placeholder="Name"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                            />
                            <input
                                className={styles.editInput}
                                placeholder="Email"
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                            />
                            <input
                                className={styles.editInput}
                                type="password"
                                placeholder="New password (leave blank to keep)"
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})}
                            />
                            <div className={styles.formActions}>
                                <button className={styles.saveBtn} type="submit">Save Changes</button>
                                <button className={styles.cancelBtn} type="button" onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                    
                    <div className={styles.actions}>
                        <button className={styles.ordersBtn} onClick={() => navigate('/orders')}>View My Orders</button>
                        <Button onClick={handleLogout} className={styles.logoutBtn}>Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile
