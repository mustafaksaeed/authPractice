import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
 
  const [auth, setAuth] = useState(() => {
   
    const token = localStorage.getItem("APP_AUTH")

    if(!token) {

      return {
        isAuthenticated: false,
        token: null
      }
    }

    return {
      isAuthenticated: true,
      token
    }
  })


  



  return (
    <AuthContext.Provider value={{ setAuth, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
