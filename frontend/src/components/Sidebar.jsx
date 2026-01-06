import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, UserPlus, Users, Fingerprint, BarChart3, LogOut, Menu } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/register-student', label: 'Register Student', icon: <UserPlus size={18} /> },
  { to: '/students', label: 'Student List', icon: <Users size={18} /> },
  { to: '/attendance', label: 'Attendance', icon: <Fingerprint size={18} /> },
  { to: '/reports', label: 'Reports', icon: <BarChart3 size={18} /> },
]

const Sidebar = () => {
  const location = useLocation()
  const [open, setOpen] = useState(true)

  return (
    <div className={`transition-all duration-200 ${open ? 'w-64' : 'w-16'} bg-base-100/90 backdrop-blur border-r border-white/60 min-h-screen shadow-lg`}>
      <div className="flex items-center justify-between px-4 py-4">
        <div className={`font-semibold text-lg text-primary transition-all ${open ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
          Dr. AQ Khan
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setOpen((p) => !p)}>
          <Menu size={18} />
        </button>
      </div>
      <div className="px-2 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 soft-hover ${
                active ? 'bg-primary text-white shadow-md' : 'hover:bg-base-200'
              }`}
            >
              <span className="text-current">{item.icon}</span>
              {open && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
        <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-error hover:bg-error/10 soft-hover">
          <LogOut size={18} />
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar

