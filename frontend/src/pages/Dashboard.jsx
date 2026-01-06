import React, { useEffect, useState } from 'react'
import { Users, Fingerprint, BarChart3, ShieldCheck } from 'lucide-react'
import StatCard from '../components/StatCard'
import api from '../services/api'

const Dashboard = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/students')
        setStudents(res.data.students || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const girls = students.filter((s) => s.gender === 'Girl').length
  const boys = students.filter((s) => s.gender === 'Boy').length

  return (
    <div className="p-4 space-y-6">
      <div>
        <p className="text-sm text-gray-500">Welcome back</p>
        <h1 className="text-2xl font-semibold text-neutral">Dashboard Overview</h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={loading ? '...' : students.length} icon={<Users />} accent="primary" />
        <StatCard title="Girls" value={loading ? '...' : girls} icon={<ShieldCheck />} accent="secondary" />
        <StatCard title="Boys" value={loading ? '...' : boys} icon={<ShieldCheck />} accent="accent" />
        <StatCard title="Attendance Today" value="Live" icon={<Fingerprint />} accent="primary" subtitle="Track via Attendance page" />
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold text-neutral mb-2">Reports snapshot</h3>
        <p className="text-sm text-gray-500">
          View detailed daily, weekly, and monthly reports with filters in the Reports page.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {['Daily', 'Weekly', 'Monthly'].map((label) => (
            <div key={label} className="px-4 py-2 rounded-full bg-base-200 text-sm">{label} summaries</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

