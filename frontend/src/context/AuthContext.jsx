import React from "react";
import { createContext,useState,useContext } from "react";
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem('token'))

  const login = async (email,password) =>{
    const res = await fetch('/api/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    }) 
    const data = await res.json();
    localStorage.setItem('token',data.token);
    setToken(data.token)
    setUser(data.user)
  }
  const register = async (name,email,password) =>{
    const res = await fetch('/api/auth/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,name,password})
    })
    const data = await res.json();
    localStorage.setItem('token',data.token)
    setToken(data.token)
    setUser(data.user)
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
