import express from "express"
import { login, bootstrapAdmin } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/auth/login", login)
router.post("/auth/bootstrap", bootstrapAdmin)

export default router

