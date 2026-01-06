import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  entryTime: { type: Date },
  exitTime: { type: Date },
  status: { type: String, enum: ["Present", "Half Day", "Absent"], default: "Present" }
}, { timestamps: true })

attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true })

const Attendance = mongoose.model("Attendance", attendanceSchema)
export default Attendance

