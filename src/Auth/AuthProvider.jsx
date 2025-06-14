import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [loginVal, setLogin] = useState("");

  return (
    <AuthContext.Provider value={{ loginVal, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
