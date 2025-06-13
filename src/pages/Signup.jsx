import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  async function Submitsign() {
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign successful:", data);
      }
    } catch (error) {
      console.error("Network error or unexpected issue during login:", error);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh", // Ensures the div takes at least the full viewport height
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <label>name</label>{" "}
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>lastname</label>{" "}
        <input type="text" onChange={(e) => setLastname(e.target.value)} />
        <label>Email</label>{" "}
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={Submitsign}>Submit</button>
      </div>
    </div>
  );
};

export default Signup;
