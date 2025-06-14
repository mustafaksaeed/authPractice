import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getMe() {
      const res = await fetch("http://localhost:8000/me", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = await res.json();

      setUser(data.user);
    }

    getMe();
  }, [auth]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>Welcome {user.email}</div>;
};

export default Dashboard;
