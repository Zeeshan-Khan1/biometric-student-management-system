import express from "express"
const router = express.Router()
import upload from "../middleware/upload.js"

import {
    readAllUsers,
    readUserById,
    updateUser
} from "../controllers/users.controllers.js"

// Read all users
router.route("/users").get(readAllUsers)

// Read single user by ID
router.route("/users/:id").get(readUserById)

// Update user
router.route("/users/:id").put(upload.single('profilePicture'), updateUser)

export default router

