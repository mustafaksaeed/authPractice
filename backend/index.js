import express from "express";
import cors from "cors";

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.send("OK works");
});

app.listen(port, () => {
  console.log("listening on port", port);
});

app.post("/signup", (req, res) => {
  res.send("ai lied");
});

const Users = [
  { id: 1, email: "test@example.com", password: "password123" },
  { id: 2, email: "another@user.com", password: "securepassword" },
];
app.post("/login", (req, res) => {
  console.log("request body", req.body);
  const { email: emailVal, password: passwordVal } = req.body;

  const user = Users.find(
    (info) => info.email === emailVal && info.password === passwordVal
  );

  if (user === undefined) {
    res.status(200).json({ message: "login failed" });
  } else {
    res.status(200).json({ message: "login success" });
  }
});

console.log("users", Users);
