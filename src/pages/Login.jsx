import React, { useState, useContext } from "react";
import AuthContext from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  async function login() {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("status", data.message);
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          token: data.token,
        }));

        localStorage.setItem("APP_AUTH", data.token)
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div>
      <label>Email</label>{" "}
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={() => login()}>
        submit
      </button>
    </div>
  );
};

export default Login;
