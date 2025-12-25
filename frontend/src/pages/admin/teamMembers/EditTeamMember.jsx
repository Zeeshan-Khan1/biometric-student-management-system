import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditTeamMember = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer'
  })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/team-members/${id}`)
        setFormData({
          name: res.data.teamMember.name,
          role: res.data.teamMember.role
        })
      } catch (error) {
        setIsError(error?.response?.data?.message || 'Error loading team member')
      } finally {
        setIsLoading(false)
      }
    }
    if (id) {
      fetchTeamMember()
    }
  }, [id])

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
      
      await axios.put(`http://localhost:8000/api/team-members/${id}`, formData)
      navigate('/admin/team-members')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      setIsError(msg)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Edit Team Member</legend>

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
            Update Team Member
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

export default EditTeamMember

