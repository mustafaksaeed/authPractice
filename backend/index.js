import express from "express";
import cors from "cors";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const port = 8000;
const app = express();

const JWT_SECRET = "hdakdhkahdkahdk";

app.use(cors());

app.use(express.json());
app.get("/health", (req, res) => {
  res.send("OK works");
});

app.listen(port, () => {
  console.log("listening on port", port);
});

app.post("/signup", (req, res) => {
  const { email: emailVal, password: passwordVal } = req.body;

  const data = JSON.parse(
    fs.readFileSync("./Database/users", { encoding: "utf-8" })
  );

  const user = data.users.find((user) => user.email === emailVal);

  if (user) {
    res.status(400).json({
      error: "User already registered with that email.",
    });

    return;
  }

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(passwordVal, salt);

  const newUser = {
    email: emailVal,
    password: hashedPassword,
  };

  data.users.push(newUser);

  fs.writeFileSync("./Database/users", JSON.stringify(data));

  res.status(201).json({
    message: "New user registered",
  });
});

app.post("/login", (req, res) => {
  const { email: emailVal, password: passwordVal } = req.body;

  const data = JSON.parse(
    fs.readFileSync("./Database/users", { encoding: "utf-8" })
  );

  const user = data.users.find((u) => u.email === emailVal);

  if (!user) {
    res.status(400).json({
      error: "Credentials do not match with an existing account",
    });

    return;
  }

  const isMatch = bcrypt.compareSync(passwordVal, user.password);

  if (!isMatch) {
    res.status(400).json({
      error: "Credentials do not match with an existing account",
    });

    return;
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "3h",
  });

  res.status(200).json({
    token,
  });
});

const authorize = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  console.log(token);

  if (!token) {
    res.status(401).json({
      error: "Unauthorized",
    });

    return;
  }

  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const data = JSON.parse(
      fs.readFileSync("./Database/users", { encoding: "utf-8" })
    );

    const user = data.users.find((u) => u.email === email);

    if (!user) {
      res.status(401).json({
        error: "Unauthorized",
      });

      return;
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
};
app.get("/me", authorize, async (req, res) => {
  delete req.user.password;

  res.status(200).json({ user: req.user });
});
/*

checks if its in local storage



*/
