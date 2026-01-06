import express from "express"
import cors from "cors"
import dotenv from "dotenv";



import authRoutes from "./routes/auth.routes.js"
import studentRoutes from "./routes/students.routes.js"
import fingerprintRoutes from "./routes/fingerprint.routes.js"
import reportRoutes from "./routes/reports.routes.js"
import connectDB from "./database/database.js"

dotenv.config();


const app = express()

// connecting to MongoDB Cluster
connectDB()

// CORS FIX
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", authRoutes)
app.use("/api", studentRoutes)
app.use("/api", fingerprintRoutes)
app.use("/api", reportRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})