import express from "express";
import db from "../db.js";

// creat router
const router = express.Router();

// get all todos from login user
router.get("/", (req, res) => {
  console.log(req.userID);
  console.log("all to do herre");
  const getTodos = db.prepare(`
    SELECT * FROM todos WHERE user_id = ?`);
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

// create new todo
router.post("/", () => {});

// updat todo
router.put("/:id", () => {});

export default router;
