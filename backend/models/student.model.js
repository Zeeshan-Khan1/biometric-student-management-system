import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 3, max: 25 },
  class: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, trim: true, unique: true },
  contact: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Girl', 'Boy'], default: 'Girl' },
  address: { type: String, required: true, trim: true },
  fingerprintTemplate: { type: String, required: true }, // encrypted string
}, { timestamps: true })

// Helpful indexes for search
studentSchema.index({ name: 1 })
studentSchema.index({ class: 1 })

const Student = mongoose.model("Student", studentSchema)
export default Student

