import express from "express"
import { dailyReport, monthlyReport } from "../controllers/reports.controller.js"

const router = express.Router()

// Reports are public for now (no auth)
router.get("/reports/daily", dailyReport)
router.get("/reports/monthly", monthlyReport)

export default router

