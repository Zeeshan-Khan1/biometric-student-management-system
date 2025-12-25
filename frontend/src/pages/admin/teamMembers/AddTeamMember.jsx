import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddTeamMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer'
  })
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.role) {
        setIsError('Name and Role are required')
        return
      }
      
      const res = await axios.post('http://localhost:8000/api/team-members', formData)
      console.log('Team member created:', res.data)
      navigate('/admin/team-members')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      console.error('Error creating team member:', msg)
      setIsError(msg)
    }
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Create New Team Member</legend>

        {isError && <div className="alert alert-error mb-4">{isError}</div>}

        <label className="label">Name</label>
        <input
          name="name"
          type="text"
          className="input w-full"
          value={formData.name}
          onChange={handleFormData}
          placeholder="Enter team member name"
        />

        <label className="label">Role</label>
        <select
          name="role"
          className="select w-full"
          value={formData.role}
          onChange={handleFormData}
        >
          <option value="Admin">Admin</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Developer">Developer</option>
        </select>

        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-neutral flex-1"
            onClick={handleSubmit}
          >
            Create Team Member
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/admin/team-members')}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </div>
  )
}

export default AddTeamMember

