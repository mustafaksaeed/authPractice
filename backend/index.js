import express from "express";

const port = 8000;
const app = express();

app.get("/health", (req, res) => {
  res.send("OK works");
});

app.listen(port, () => {
  console.log("listening on port", port);
});
