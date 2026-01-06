import Student from "../models/student.model.js"
import { encryptTemplate } from "../utils/crypto.js"
import { hashFingerprint } from "../services/fingerprint.service.js"

export const registerStudent = async (req, res) => {
  try {
    const { name, fatherName, age, class: className, rollNumber, contact, address, fingerprintTemplate, gender } = req.body
    if (!name || !fatherName || !age || !className || !rollNumber || !contact || !address || !fingerprintTemplate) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }
    const exists = await Student.findOne({ rollNumber })
    if (exists) {
      return res.status(400).json({ success: false, message: "Roll number already registered" })
    }

    const encrypted = encryptTemplate(fingerprintTemplate)
    const student = new Student({
      name,
      fatherName,
      age,
      class: className,
      rollNumber,
      contact,
      address,
      gender,
      fingerprintTemplate: encrypted
    })
    await student.save()
    res.status(201).json({ success: true, student })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

export const listStudents = async (req, res) => {
  try {
    const { search = "", class: classFilter } = req.query
    const query = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } }
      ]
    }
    if (classFilter) {
      query.class = classFilter
    }
    const students = await Student.find(query).sort({ createdAt: -1 }).select("-fingerprintTemplate")
    res.json({ success: true, students })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-fingerprintTemplate")
    if (!student) return res.status(404).json({ success: false, message: "Student not found" })
    res.json({ success: true, student })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Student not found" })
    }
    res.json({ success: true, message: "Student deleted" })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

