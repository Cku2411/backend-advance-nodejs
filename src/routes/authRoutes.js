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

    // Truy xuất todos theo user_id
    const userTodos = db
      .prepare("SELECT * FROM todos WHERE user_id = ?")
      .all(1);

    // create a token to send back
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
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
  const { username, password } = req.body;
  console.log({ username, password });

  try {
    const getUser = db.prepare(`
      SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // if user, then check the password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: "Invalid Password" });

    // then we have a successfully
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // sendBack to user
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});
export default router;
