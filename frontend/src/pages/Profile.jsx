import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import styles from "./Profile.module.css";

const Profile = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    return (
        <div>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.card}>
                    <h2 className={styles.heading}>My Profile</h2>
                    <div className={styles.field}>
                        <p className={styles.fieldLabel}>Full Name</p>
                        <p className={styles.fieldValue}>{user?.name}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldLabel}>Email</p>
                        <p className={styles.fieldValue}>{user?.email}</p>
                    </div>
                    <Button onClick={handleLogout} className={styles.logoutBtn}>Logout</Button>
                </div>
            </div>
        </div>
    )
}
export default Profile
