import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../config/api'

const Users = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    handleReadAll()
  }, [])

  const handleReadAll = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await axios.get(`${API_URL}/users`)
      setUsers(res.data.users || [])
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user._id)
    setFormData({
      email: user.email,
      password: ''
    })
    if (user.profilePicture) {
      setImagePreview(user.profilePicture)
    } else {
      setImagePreview(null)
    }
    setImageFile(null)
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
    setFormData({ email: '', password: '' })
    setImageFile(null)
    setImagePreview(null)
  }

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (userId) => {
    try {
      if (!formData.email) {
        setError('Email is required')
        return
      }
      
      setIsSubmitting(true)
      setError(null)

      const submitData = new FormData()
      submitData.append('email', formData.email)
      if (formData.password) {
        submitData.append('password', formData.password)
      }
      if (imageFile) {
        submitData.append('profilePicture', imageFile)
      }
      
      await axios.put(`${API_URL}/users/${userId}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      await handleReadAll()
      handleCancelEdit()
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      setError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Profile Picture</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {editingUser === user._id ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                        />
                        {imagePreview && (
                          <div>
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.profilePicture ? (
                          <img 
                            src={user.profilePicture} 
                            alt={user.email}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold text-lg">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td>
                    {editingUser === user._id ? (
                      <input
                        name="email"
                        type="email"
                        className="input input-bordered input-sm w-full max-w-xs"
                        value={formData.email}
                        onChange={handleFormData}
                        placeholder="Enter email"
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </td>
                  <td>
                    {editingUser === user._id ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => handleSubmit(user._id)}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={handleCancelEdit}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No users found.</div>
      )}

      {editingUser && (
        <div className="card bg-base-200 p-4">
          <h3 className="font-bold mb-2">Update Password (Optional)</h3>
          <input
            name="password"
            type="password"
            className="input input-bordered w-full max-w-xs"
            value={formData.password}
            onChange={handleFormData}
            placeholder="Enter new password (leave empty to keep current)"
          />
        </div>
      )}
    </div>
  )
}

export default Users
