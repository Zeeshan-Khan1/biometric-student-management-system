import React, { useEffect, useState } from 'react'
import api from '../services/api'

const StudentsList = () => {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = {}
      if (search) params.search = search
      if (classFilter) params.class = classFilter
      const res = await api.get('/students', { params })
      setStudents(res.data.students || [])
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load students'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <div className="flex gap-2 flex-wrap">
        <input
          className="input input-bordered"
          placeholder="Search by name or roll"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Filter by class"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={fetchStudents} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Roll</th>
              <th>Contact</th>
              <th>Fingerprint</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={s._id || idx}>
                <td>{idx + 1}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{s.rollNumber}</td>
                <td>{s.contact}</td>
                <td><span className="badge badge-primary">Captured</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && !loading && <div className="alert alert-info mt-2">No students found</div>}
      </div>
    </div>
  )
}

export default StudentsList

