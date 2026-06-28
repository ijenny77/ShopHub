import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getUsers, updateUserRole } from "../api/index.js";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import styles from "./AdminUsers.module.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: me } = useAuth();

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data : u)));
      toast.success("Role updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update role");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>User Management</h2>
          <span className={styles.count}>{users.length} users</span>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={4} className={styles.empty}>No users found.</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>
                          {u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <span>{u.name}</span>
                        {u._id === me?._id && <span className={styles.youBadge}>You</span>}
                      </div>
                    </td>
                    <td className={styles.email}>{u.email}</td>
                    <td className={styles.date}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        className={`${styles.roleSelect} ${u.role === 'admin' ? styles.admin : styles.user}`}
                        value={u.role}
                        disabled={u._id === me?._id}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
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
};

export default AdminUsers;
