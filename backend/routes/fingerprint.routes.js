import express from "express"
import { verifyFingerprint, punchAttendance } from "../controllers/fingerprint.controller.js"

const router = express.Router()

router.post("/fingerprint/verify", verifyFingerprint)
router.post("/fingerprint/punch", punchAttendance)

export default router

