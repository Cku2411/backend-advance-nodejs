import express from "express";
import db from "../db.js";

// creat router
const router = express.Router();

// get all todos from login user
router.get("/", () => {
  console.log("all to do herre");
});

// create new todo
router.post("/", () => {});

// updat todo
router.put("/:id", () => {});

export default router;
