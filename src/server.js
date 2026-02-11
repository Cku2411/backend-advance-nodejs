const express = require("express");
const app = express();

const PORT = 3000;

console.log("__file name", __dirname);

const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
