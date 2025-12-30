import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const Stats = () => {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await axios.get(`${API_URL}/dashboard/stats`)
      setStats(res.data.stats)
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error loading statistics'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
        <button className="btn btn-sm" onClick={fetchStats}>Retry</button>
      </div>
    )
  }

  if (!stats) {
    return <div className="alert alert-info">No statistics available</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Analytics</h1>
        <button className="btn btn-secondary" onClick={fetchStats}>
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Total Projects</div>
          <div className="stat-value text-primary">{stats.totalProjects}</div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Total Tasks</div>
          <div className="stat-value text-secondary">{stats.totalTasks}</div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Completed Tasks</div>
          <div className="stat-value text-success">{stats.statusBreakdown?.Completed || 0}</div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h2 className="card-title">Tasks by Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="stat bg-base-100 rounded-box">
              <div className="stat-title">To Do</div>
              <div className="stat-value text-info">{stats.statusBreakdown?.['To Do'] || 0}</div>
            </div>
            <div className="stat bg-base-100 rounded-box">
              <div className="stat-title">In Progress</div>
              <div className="stat-value text-warning">{stats.statusBreakdown?.['In Progress'] || 0}</div>
            </div>
            <div className="stat bg-base-100 rounded-box">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-success">{stats.statusBreakdown?.Completed || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks per Project */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h2 className="card-title">Tasks per Project</h2>
          {stats.tasksPerProject && stats.tasksPerProject.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Total Tasks</th>
                    <th>To Do</th>
                    <th>In Progress</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.tasksPerProject.map((project, idx) => (
                    <tr key={project.projectId || idx}>
                      <td className="font-semibold">{project.projectName}</td>
                      <td>{project.totalTasks}</td>
                      <td>
                        <span className="badge badge-info">{project.toDo}</span>
                      </td>
                      <td>
                        <span className="badge badge-warning">{project.inProgress}</span>
                      </td>
                      <td>
                        <span className="badge badge-success">{project.completed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No tasks found in any project</p>
          )}
        </div>
      </div>

      {/* Tasks by Team Member */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h2 className="card-title">Tasks Assigned to Team Members</h2>
          {stats.tasksByMember && stats.tasksByMember.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Team Member</th>
                    <th>Role</th>
                    <th>Total Tasks</th>
                    <th>To Do</th>
                    <th>In Progress</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.tasksByMember.map((member, idx) => (
                    <tr key={member.memberId || idx}>
                      <td className="font-semibold">{member.memberName}</td>
                      <td>
                        <span className={`badge ${
                          member.memberRole === 'Admin' ? 'badge-error' :
                          member.memberRole === 'Project Manager' ? 'badge-warning' :
                          'badge-info'
                        }`}>
                          {member.memberRole}
                        </span>
                      </td>
                      <td>{member.totalTasks}</td>
                      <td>
                        <span className="badge badge-info">{member.toDo}</span>
                      </td>
                      <td>
                        <span className="badge badge-warning">{member.inProgress}</span>
                      </td>
                      <td>
                        <span className="badge badge-success">{member.completed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No tasks assigned to team members</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Stats
