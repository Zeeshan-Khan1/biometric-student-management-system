import { Routes, Route, Navigate } from "react-router"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import RegisterStudent from "./pages/RegisterStudent"
import Attendance from "./pages/Attendance"
import StudentList from "./pages/StudentList"
import Reports from "./pages/Reports"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

const Shell = ({ children }) => (
  <div className="min-h-screen flex bg-base-200">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  </div>
)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Shell><Dashboard /></Shell>} />
      <Route path="/register-student" element={<Shell><RegisterStudent /></Shell>} />
      <Route path="/attendance" element={<Shell><Attendance /></Shell>} />
      <Route path="/students" element={<Shell><StudentList /></Shell>} />
      <Route path="/reports" element={<Shell><Reports /></Shell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
