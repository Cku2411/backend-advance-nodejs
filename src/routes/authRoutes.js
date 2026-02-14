import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  const hashedPassword = bcrypt.hashSync(password, 8);
  console.log({ hashedPassword });
  try {
    // prepare sql command
    const insertUser = db.prepare(`
        INSERT INTO users (username, password) VALUES (?,?)
        `);

    // runcommand, provide params
    const result = insertUser.run(username, hashedPassword);

    // add default todo
    const defaultTodo = `Hello :), Add your 1st todo`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES(?,?)`,
    );

    const userId = result.lastInsertRowid;

    // run commnad
    const resultTodo = insertTodo.run(userId, defaultTodo);
    // check all users

    const users = db.prepare("SELECT * FROM users").all();
    console.log("Users:", users);

    // Truy xuất todos theo user_id
    const userTodos = db
      .prepare("SELECT * FROM todos WHERE user_id = ?")
      .all(1);
    console.log("Todos của user 1:", userTodos);

    // create a token to send back
    const token = jwt.sign({ id: userId }, process.env.JW_SECRET, {
      expiresIn: "24h",
    });

    // sendBack to user
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  console.log("hello");
  res.send(JSON.stringify("ehllo"));
});

export default router;
