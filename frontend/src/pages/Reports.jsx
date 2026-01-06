import React, { useEffect, useState } from 'react'
import api from '../services/api'
import Filters from '../components/Filters'

const Reports = () => {
  const [filters, setFilters] = useState({
    date: '',
    week: '',
    month: '',
    gender: 'all',
    className: ''
  })
  const [rows, setRows] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ present: 0, absent: 0 })

  const applyFilters = async () => {
    try {
      setLoading(true)
      setError(null)

      // Decide which endpoint to call: day -> daily, month/week -> monthly
      let data = []
      if (filters.date) {
        const res = await api.get('/reports/daily', { params: { date: filters.date } })
        data = res.data.records || []
      } else {
        const monthParam = filters.month || new Date().toISOString().slice(0, 7)
        const res = await api.get('/reports/monthly', { params: { month: monthParam } })
        data = res.data.records || []
      }

      // Filter by week if provided (inclusive 7-day range)
      if (filters.week) {
        const start = new Date(filters.week)
        const end = new Date(start)
        end.setDate(start.getDate() + 6)
        data = data.filter((r) => {
          const d = new Date(r.date)
          return d >= start && d <= end
        })
      }

      // Gender filter
      if (filters.gender !== 'all') {
        data = data.filter((r) => r.studentId?.gender === filters.gender)
      }

      // Class filter
      if (filters.className) {
        data = data.filter((r) => r.studentId?.class?.toString().toLowerCase() === filters.className.toLowerCase())
      }

      setRows(data)
      const present = data.filter((r) => r.entryTime).length
      const absent = data.length - present
      setStats({ present, absent })
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to fetch reports'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="text-sm text-gray-500">Analyze attendance</p>
        <h1 className="text-2xl font-semibold text-neutral">Reports</h1>
      </div>

      <Filters filters={filters} onChange={setFilters} onApply={applyFilters} />
      {error && <div className="alert alert-error">{error}</div>}

      <div className="grid md:grid-cols-3 gap-3">
        <div className="glass-card p-4">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-2xl font-semibold">{rows.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-gray-500">Present</p>
          <p className="text-2xl font-semibold text-success">{stats.present}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-gray-500">Absent</p>
          <p className="text-2xl font-semibold text-error">{stats.absent}</p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-neutral">Attendance Records</h3>
          {loading && <span className="loading loading-spinner loading-sm text-primary" />}
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Date</th>
                <th>Entry</th>
                <th>Exit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.studentId?.name}</td>
                  <td>{r.studentId?.class}</td>
                  <td>{r.studentId?.gender}</td>
                  <td>{r.date}</td>
                  <td>{r.entryTime ? new Date(r.entryTime).toLocaleTimeString() : '-'}</td>
                  <td>{r.exitTime ? new Date(r.exitTime).toLocaleTimeString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <div className="alert alert-info mt-2">No records</div>}
        </div>
      </div>
    </div>
  )
}

export default Reports

