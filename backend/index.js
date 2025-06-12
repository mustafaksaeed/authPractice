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

app.post("/signup", (req, res) => {
  res.send("ai lied");
});

app.post("/login", (req, res) => {
  const { email: emailVal, password: passwordVal } = req.body;

  const rawData = fs.readFileSync("./Database/users", "utf8");
  let users = JSON.parse(rawData);

  const newUser = {
    id: Date.now(),
    email: emailVal,
    password: passwordVal,
  };

  users.push(newUser);
  fs.writeFileSync("./Database/users", JSON.stringify(users, null, 2), "utf8");
  res.send({
    msg: "CREATED USER",
  });
});
