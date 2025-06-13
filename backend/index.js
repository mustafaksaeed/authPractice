import express from "express";
import cors from "cors";
import fs from "fs";

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
  console.log("req.body", req.body);

  const newUser = {
    id: Date.now(),
    name: nameVal,
    email: emailVal,
    password: passwordVal,
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

  const logged = users.find(
    (user) => user.email === emailVal && user.password === passwordVal
  );

  if (!logged) {
    res.send("login failed");
  } else {
    res.send("login successful");
  }
});

/*

problem writing to file

solution reasd file and write as well 



*/
