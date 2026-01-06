import React from 'react'
import { Link } from 'react-router-dom'
import { Fingerprint, ShieldCheck, Users, SlidersHorizontal, LayoutDashboard } from 'lucide-react'

const features = [
  { icon: <Fingerprint size={22} />, title: 'Fingerprint Attendance', desc: 'Fast biometric entry/exit tracking.' },
  { icon: <ShieldCheck size={22} />, title: 'Secure Student Records', desc: 'Encrypted templates & safe storage.' },
  { icon: <Users size={22} />, title: 'Gender-based Reports', desc: 'Insights split for girls and boys.' },
  { icon: <SlidersHorizontal size={22} />, title: 'Smart Filtering', desc: 'Filter by date, week, month, class.' },
  { icon: <LayoutDashboard size={22} />, title: 'Admin Control Panel', desc: 'Manage students and attendance.' },
]

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="glass-card p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-sm">
              <Fingerprint size={18} /> Smart Biometric Attendance
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral leading-tight">
              Dr. AQ Khan School
            </h1>
            <p className="text-gray-600 text-lg">
              Smart Student Attendance &amp; Biometric Management System built for a friendly, modern school experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard" className="btn btn-primary soft-hover">View Dashboard</Link>
              <Link to="/register-student" className="btn btn-secondary soft-hover">Admin Login (Skip)</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-6 w-28 h-28 bg-accent/20 rounded-full blur-2xl" />
            <div className="glass-card p-6 md:p-8 relative z-10 space-y-4">
              <p className="text-sm text-gray-500">At a glance</p>
              <div className="flex gap-3 items-center">
                <div className="p-3 rounded-2xl bg-primary/15 text-primary font-semibold text-2xl">98%</div>
                <div>
                  <p className="text-sm text-gray-600">Attendance Accuracy</p>
                  <p className="font-semibold text-neutral">Biometric powered tracking</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-base-200 shadow-inner">
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="text-xl font-semibold text-neutral">1200+</p>
                </div>
                <div className="p-4 rounded-2xl bg-base-200 shadow-inner">
                  <p className="text-sm text-gray-500">Classes</p>
                  <p className="text-xl font-semibold text-neutral">K - 10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-neutral mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-4 soft-hover">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary inline-flex">{f.icon}</div>
                <h3 className="mt-3 font-semibold text-neutral">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { title: 'Fingerprint Attendance', desc: 'Instant entry/exit logging with simulated biometrics.' },
            { title: 'Secure Records', desc: 'Encrypted fingerprint templates, no images stored.' },
            { title: 'Smart Reporting', desc: 'Daily, weekly, and monthly insights with gender splits.' },
          ].map((card) => (
            <div key={card.title} className="glass-card p-5 soft-hover">
              <h4 className="font-semibold text-neutral mb-2">{card.title}</h4>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Dr. AQ Khan School — Academic Project</p>
          <p className="text-xs">Smart Student Attendance &amp; Biometric Management System</p>
        </div>
      </div>
    </div>
  )
}

export default Landing

