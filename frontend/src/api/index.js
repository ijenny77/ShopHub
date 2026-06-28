import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://shophub-p3x3.onrender.com";
const api = axios.create({ baseURL: `${BASE_URL}/api` });

export const getImageUrl = (path) =>
  !path || path.startsWith('http') ? path : `${BASE_URL}${path}`;

// Attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────────────────────────
export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");
export const updateMe = (data) => api.put('/auth/me', data)

// ── Products ──────────────────────────────────────────────────────────────
// GET /api/products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=
export const getProducts = (params) => api.get("/products", { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ── Categories ────────────────────────────────────────────────────────────
export const getCategories = () => api.get("/categories");

// ── Cart ──────────────────────────────────────────────────────────────────
export const getCart = () => api.get("/cart");
export const addToCart = (productId, quantity) =>
  api.post("/cart", { productId, quantity });
export const updateCartItem = (productId, quantity) =>
  api.put(`/cart/${productId}`, { quantity });
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);
export const clearCart = () => api.delete("/cart");

// ── Orders ────────────────────────────────────────────────────────────────
export const createOrder = (data) => api.post("/orders", data);
export const getMyOrders = () => api.get("/orders/my");
export const getOrder = (id) => api.get(`/orders/${id}`);

// ── Admin ─────────────────────────────────────────────────────────────────
export const getAllOrders = () => api.get("/admin/orders");
export const updateOrderStatus = (id, status) =>
  api.put(`/admin/orders/${id}`, { status });
export const getUsers = () => api.get("/admin/users");
export const updateUserRole = (id, role) => api.put(`/admin/users/${id}/role`, { role });

export default api;
