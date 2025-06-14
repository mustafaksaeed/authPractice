import express from "express";
import cors from "cors";
import fs from "fs";
// import bcrypt from "bcrypt";

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

let users = {
  users: [],
};

app.post("/signup", (req, res) => {
  const { email: emailVal, password: passwordVal, name: nameVal } = req.body;

  const hash = passwordVal;
  const newUser = {
    id: Date.now(),
    name: nameVal,
    email: emailVal,
    password: hash,
  };

  users.users.push(newUser);

  fs.writeFileSync("./Database/users", JSON.stringify(users, null, 2), "utf8");
  res.send({
    msg: "CREATED USER",
  });

  console.log("users", users);
});

app.post("/login", (req, res) => {
  const { email: emailVal, password: passwordVal } = req.body;

  const logged = users.users.find(
    (user) => user.email === emailVal && user.password === passwordVal
  );

  if (logged === undefined) {
    res.json({ status: false, message: "Login failed: Invalid credentials." });
  } else {
    res.json({ status: true, message: "Login successful!" });
  }
});

/*

problem writing to file

solution reasd file and write as well 



*/
