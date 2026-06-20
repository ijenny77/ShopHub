import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {token,user} = useAuth()
    if(!token) return <Navigate to='/login'/>
    if(user === null) return null;
    if(user?.role !== 'admin') return <Navigate to='/'/>
    return children
}
export default AdminRoute