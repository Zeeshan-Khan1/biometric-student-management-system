import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">Project Management & Task Tracking System</h1>
                <p className="text-lg text-gray-600">Manage your projects, tasks, and team members efficiently</p>
                <Link to="/admin" className="btn btn-primary btn-lg">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    )
}

export default Home
