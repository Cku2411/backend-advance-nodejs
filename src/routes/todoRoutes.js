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

  console.log(req.userId);
  console.log(req.body);

  const { task } = req.body;
  if (!task) {
    return res.status(404).send({ message: "Task not found" });
  }

  const userId = req.userId;
  // add default todo
  const addTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?,?)`);

  addTodo.run(userId, task);
  res.json({ id: addTodo.lastID, task, completed: 0 });
});

// updat todo
router.put("/:id", () => {});

export default router;
