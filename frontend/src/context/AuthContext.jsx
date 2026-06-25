import React, { useEffect } from "react";
import { createContext,useState,useContext } from "react";
import toast from "react-hot-toast";
import { login as apiLogin, register as apiRegister, getMe } from "../api/index.js";
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem('token'))
  useEffect(()=>{
    if(token) {
      getMe()
      .then(res => setUser(res.data.user))
      .catch(()=>{
        localStorage.removeItem('token')
        setToken(null)
      })
    }
  },[])
  const login = async (email,password) =>{
    const res = await apiLogin({email,password})
    const data = res.data;
    localStorage.setItem('token',data.token);
    setToken(data.token)
    setUser(data.user)
    toast.success("Welcome back")
  }
  const register = async (name,email,password) =>{
    const res = await apiRegister({email,name,password})
    const data = res.data;
    localStorage.setItem('token',data.token)
    setToken(data.token)
    setUser(data.user)
    toast.success("Account created")
  }
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }
  return(
    <AuthContext.Provider value={{user,setUser,token,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () =>useContext(AuthContext)


export default AuthProvider;
