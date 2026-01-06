import React, { useEffect, useState } from 'react'
import api from '../services/api'
import StudentTable from '../components/StudentTable'
import { Search } from 'lucide-react'

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const params = {}
      if (search) params.search = search
      if (classFilter) params.class = classFilter
      const res = await api.get('/students', { params })
      setStudents(res.data.students || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="p-4 space-y-4">
      <div className="glass-card p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1">
          <label className="label">Search (name or roll)</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="input input-bordered w-full pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g., Ayesha or 12"
            />
          </div>
        </div>
        <div>
          <label className="label">Class</label>
          <input
            className="input input-bordered"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>
        <button className="btn btn-primary soft-hover" onClick={load} disabled={loading}>
          {loading ? 'Loading...' : 'Apply'}
        </button>
      </div>

      <StudentTable students={students} onChanged={load} />
    </div>
  )
}

export default StudentList

