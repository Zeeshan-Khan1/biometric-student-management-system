import express from "express"
import cors from "cors"
import dotenv from "dotenv";



import teamMemberRoutes from "./routes/teamMembers.routes.js"
import projectRoutes from "./routes/projects.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import connectDB from "./database/database.js"

dotenv.config();


const app = express()

// connecting to MongoDB Cluster
connectDB()

// CORS FIX
app.use(cors({
    origin: "http://localhost:5173",   // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


// Middleware
app.use(express.json())
app.use("/api", teamMemberRoutes)
app.use("/api", projectRoutes)
app.use("/api", taskRoutes)
app.use("/api", dashboardRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})