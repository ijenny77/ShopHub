import React, { useEffect } from "react";
import { createContext,useState,useContext } from "react";
import toast from "react-hot-toast";
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem('token'))
  useEffect(()=>{
    if(token) {
      fetch('/api/auth/me',{
        headers:{Authorization:`Bearer ${token}`}
      })
      .then(res =>res.json())
      .then(data => setUser(data.user))
      .catch(()=>{
        localStorage.removeItem('token')
        setToken(null)
      })
    }
  },[])
  const login = async (email,password) =>{
    const res = await fetch('/api/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    }) 
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong')
    localStorage.setItem('token',data.token);
    setToken(data.token)
    setUser(data.user)
    toast.success("Welcome back")
  }
  const register = async (name,email,password) =>{
    const res = await fetch('/api/auth/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,name,password})
    })
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong')
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
    <AuthContext.Provider value={{user,token,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () =>useContext(AuthContext)


export default AuthProvider;
