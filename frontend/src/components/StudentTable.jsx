import React, { useState } from 'react'
import { Pencil, Trash2, BadgeCheck } from 'lucide-react'
import api from '../services/api'

const StudentTable = ({ students = [], onChanged }) => {
  const [confirmId, setConfirmId] = useState(null)
  const [loadingId, setLoadingId] = useState(null)

  const handleDelete = async (id) => {
    setLoadingId(id)
    try {
      await api.delete(`/students/${id}`)
      onChanged?.()
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete')
    } finally {
      setLoadingId(null)
      setConfirmId(null)
    }
  }

  return (
    <div className="glass-card p-4">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Fingerprint</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="font-medium">{s.name}</td>
                <td>{s.class}</td>
                <td>
                  <span className={`badge ${s.gender === 'Girl' ? 'badge-secondary' : 'badge-primary'}`}>
                    {s.gender || '—'}
                  </span>
                </td>
                <td>
                  <span className="badge badge-success gap-1">
                    <BadgeCheck size={14} />
                    Captured
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-xs" title="Edit (coming soon)">
                      <Pencil size={14} />
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => setConfirmId(s._id)}
                      disabled={loadingId === s._id}
                    >
                      <Trash2 size={14} />
                    </button>
                    {confirmId === s._id && (
                      <div className="modal modal-open">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Delete student?</h3>
                          <p className="py-2 text-sm text-gray-600">
                            This will permanently remove the student record.
                          </p>
                          <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setConfirmId(null)}>
                              Cancel
                            </button>
                            <button
                              className="btn btn-error"
                              onClick={() => handleDelete(s._id)}
                              disabled={loadingId === s._id}
                            >
                              {loadingId === s._id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="alert alert-info mt-3">No students found.</div>
        )}
      </div>
    </div>
  )
}

export default StudentTable

