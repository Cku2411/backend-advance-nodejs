import express from "express";
import { config } from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename, __dirname);

// get the file path from the URL of the current module
// use middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "/public")));

// Serving up the HTML file from public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Website endpoint

const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
