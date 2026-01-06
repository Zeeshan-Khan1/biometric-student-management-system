import React, { useState } from 'react'
import { Fingerprint } from 'lucide-react'
import api from '../services/api'

const StudentForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    age: '',
    class: '',
    rollNumber: '',
    gender: 'Girl',
    contact: '',
    address: '',
    fingerprintTemplate: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const simulateFingerprint = () => {
    const template = crypto.randomUUID()
    setForm((prev) => ({ ...prev, fingerprintTemplate: template }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const payload = { ...form, age: Number(form.age) }
      await api.post('/students', payload)
      setSuccess('Student registered successfully')
      onSuccess?.()
      setForm({
        name: '',
        fatherName: '',
        age: '',
        class: '',
        rollNumber: '',
        gender: 'Girl',
        contact: '',
        address: '',
        fingerprintTemplate: ''
      })
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-primary/15 text-primary">
          <Fingerprint size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Register Student</h2>
          <p className="text-sm text-gray-500">Capture details & fingerprint template</p>
        </div>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="label">Full Name</label>
          <input name="name" className="input input-bordered w-full" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Father Name</label>
          <input name="fatherName" className="input input-bordered w-full" value={form.fatherName} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Age</label>
          <input name="age" type="number" min="3" max="25" className="input input-bordered w-full" value={form.age} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Class</label>
          <input name="class" className="input input-bordered w-full" value={form.class} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Roll Number</label>
          <input name="rollNumber" className="input input-bordered w-full" value={form.rollNumber} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Contact Number</label>
          <input name="contact" className="input input-bordered w-full" value={form.contact} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Gender</label>
          <div className="join">
            {['Girl', 'Boy'].map((g) => (
              <input
                key={g}
                type="radio"
                name="gender"
                value={g}
                className="join-item btn"
                checked={form.gender === g}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="label">Address</label>
          <textarea name="address" className="textarea textarea-bordered w-full" value={form.address} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="label">Fingerprint Template</label>
          <div className="flex gap-2 flex-col md:flex-row">
            <input
              name="fingerprintTemplate"
              className="input input-bordered flex-1"
              value={form.fingerprintTemplate}
              onChange={handleChange}
              placeholder="Captured template"
              required
            />
            <button type="button" className="btn btn-secondary soft-hover" onClick={simulateFingerprint}>
              Capture Fingerprint (Simulated)
            </button>
          </div>
          <p className="text-xs text-gray-500">No hardware needed — a unique string simulates the fingerprint.</p>
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full soft-hover" disabled={loading}>
            {loading ? 'Saving...' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm

