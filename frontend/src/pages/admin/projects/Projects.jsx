import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDeletingId, setIsDeletingId] = useState(null)

  useEffect(() => {
    handleReadAll()
  }, [])

  const handleReadAll = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await axios.get(`${API_URL}/projects`)
      setProjects(res.data.projects || [])
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    const confirmDelete = window.confirm('Are you sure you want to delete this project?')
    if (!confirmDelete) return

    try {
      setIsDeletingId(id)
      setError(null)
      await axios.delete(`${API_URL}/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsDeletingId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link to="/admin/add-project" className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Project
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : projects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Project Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project._id || idx}>
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{project.name}</td>
                  <td>{project.description || '-'}</td>
                  <td>{formatDate(project.startDate)}</td>
                  <td>{formatDate(project.endDate)}</td>
                  <td>
                    {project.projectManager ? (
                      <span className="badge badge-primary">
                        {project.projectManager.name}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-project/${project._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(project._id)}
                        disabled={isDeletingId === project._id}
                      >
                        {isDeletingId === project._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No projects found. Add your first project!</div>
      )}
    </div>
  )
}

export default Projects

