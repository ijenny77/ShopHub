import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { token } = useAuth()
    const location = useLocation()
    return token ? children : <Navigate to='/login'state={{from: location.pathname}}/>
}
export default ProtectedRoute