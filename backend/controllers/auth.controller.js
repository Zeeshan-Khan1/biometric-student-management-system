import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js"
import bcrypt from "bcryptjs"

const signToken = (admin) => {
  return jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" })
    }
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" })
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" })

    const token = signToken(admin)
    res.json({ success: true, token, admin: { id: admin._id, username: admin.username } })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

// Utility endpoint to create first admin (should be removed/secured in production)
export const bootstrapAdmin = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" })
    }
    const existing = await Admin.findOne({ username })
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin already exists" })
    }
    const admin = new Admin({ username, password })
    await admin.save()
    res.status(201).json({ success: true, message: "Admin created" })
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
  }
}

