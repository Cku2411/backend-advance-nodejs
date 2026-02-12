const express = require("express");
require("dotenv").config();

let data = [{ name: "hello", job: "full time cyrptor" }];

const app = express();
const PORT = 3000;

// use middleware
app.use(express.json());

// HTTP VERBS & ROUTES
app.get("/", (req, res) => {
  console.log("yep, the endpoint");
  res.send(`<div style="background:pink; color:blue">
    <h1>This is just the fontend code</h1>
    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">DashBoard</a>
    <div/>`);
});

app.get("/dashboard", (req, res) => {
  res.send(`<div style="background:black; color:white">
    <h1>This is The DashBoard</h1>
    <a href="/">Home</a>
    <div/>`);
});

// Website endpoint
app.get("/api/data", (req, res) => {
  res.send(data);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry);

  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  console.log("data delete");
  data = [];
  res.sendStatus(200);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
