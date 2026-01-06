import express from "express"
import { registerStudent, listStudents, getStudent, deleteStudent } from "../controllers/students.controller.js"

const router = express.Router()

// All student routes are public for now (no auth)
router.post("/students", registerStudent)
router.get("/students", listStudents)
router.get("/students/:id", getStudent)
router.delete("/students/:id", deleteStudent)

export default router

