import Student from "../models/student.model.js"
import Attendance from "../models/attendance.model.js"
import { isFingerprintMatch } from "../services/fingerprint.service.js"
import dayjs from "dayjs"

// Verify fingerprint and return matched student (without template)
export const verifyFingerprint = async (req, res) => {
  try {
    const { fingerprintTemplate } = req.body
    if (!fingerprintTemplate) {
      return res.status(400).json({ success: false, message: "Fingerprint template is required" })
    }
    const students = await Student.find({})
    let matchedStudent = null
    for (const s of students) {
      if (isFingerprintMatch(s.fingerprintTemplate, fingerprintTemplate)) {
        matchedStudent = s
        break
      }
    }
    if (!matchedStudent) return res.status(404).json({ success: false, message: "No match found" })
    const { fingerprintTemplate: _, ...rest } = matchedStudent.toObject()
    res.json({ success: true, student: rest })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

// Combined entry/exit punch based on existing record
export const punchAttendance = async (req, res) => {
  try {
    const { fingerprintTemplate } = req.body
    if (!fingerprintTemplate) {
      return res.status(400).json({ success: false, message: "Fingerprint template is required" })
    }
    const students = await Student.find({})
    let matchedStudent = null
    for (const s of students) {
      if (isFingerprintMatch(s.fingerprintTemplate, fingerprintTemplate)) {
        matchedStudent = s
        break
      }
    }
    if (!matchedStudent) return res.status(404).json({ success: false, message: "No match found" })

    const today = dayjs().format("YYYY-MM-DD")
    let attendance = await Attendance.findOne({ studentId: matchedStudent._id, date: today })
    const now = new Date()
    let action = ""
    if (!attendance) {
      attendance = new Attendance({
        studentId: matchedStudent._id,
        date: today,
        entryTime: now,
        status: "Present"
      })
      action = "entry"
      await attendance.save()
    } else if (!attendance.exitTime) {
      attendance.exitTime = now
      action = "exit"
      await attendance.save()
    } else {
      action = "already_marked"
    }

    const { fingerprintTemplate: _, ...studentSafe } = matchedStudent.toObject()
    res.json({ success: true, action, student: studentSafe, attendance })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

