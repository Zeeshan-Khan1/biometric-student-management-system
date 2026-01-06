import Attendance from "../models/attendance.model.js"
import Student from "../models/student.model.js"
import dayjs from "dayjs"

export const dailyReport = async (req, res) => {
  try {
    const { date } = req.query
    const targetDate = date || dayjs().format("YYYY-MM-DD")
    const records = await Attendance.find({ date: targetDate }).populate("studentId", "name class rollNumber")
    res.json({ success: true, date: targetDate, records })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

export const monthlyReport = async (req, res) => {
  try {
    const { month } = req.query // YYYY-MM
    const targetMonth = month || dayjs().format("YYYY-MM")
    const start = dayjs(targetMonth).startOf("month").format("YYYY-MM-DD")
    const end = dayjs(targetMonth).endOf("month").format("YYYY-MM-DD")

    const records = await Attendance.find({
      date: { $gte: start, $lte: end }
    }).populate("studentId", "name class rollNumber")

    res.json({ success: true, month: targetMonth, records })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

