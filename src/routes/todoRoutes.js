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
router.post("/", (req, res) => {
  console.log(`post more todos`);
  const { task } = req.body;

  // add default todo
  const defaultTodo = `Hello :), Add your 1st todo`;
  const insertTodo = db.prepare(
    `INSERT INTO todos (user_id, task) VALUES(?,?)`,
  );

  const addTodos = db.prepare(`

    `);
});

// updat todo
router.put("/:id", () => {});

export default router;
