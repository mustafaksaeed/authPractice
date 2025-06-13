import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
