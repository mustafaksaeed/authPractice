import React from "react";

const Signup = () => {
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
        <label>name</label> <input type="text" />
        <label>lastname</label> <input type="text" />
        <label>Email</label> <input type="text" />
        <label>Password</label>
        <input type="password" />
        <label>Re-type Password</label>
        <input type="password" />
      </div>
    </div>
  );
};

export default Signup;
