import React from 'react'
import { Link, Outlet } from "react-router"

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">Project Management System</div>
                </nav>
                {/* Page content here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* Dashboard/Stats */}
                        <li>
                            <Link to={"/admin/stats"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                                    <circle cx="12" cy="12" r="2" />
                                    <path d="M13.4 10.6 19 5" />
                                </svg>
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </Link>
                        </li>

                        {/* Projects */}
                        <li>
                            <Link to={"/admin/projects"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Projects">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                </svg>
                                <span className="is-drawer-close:hidden">Projects</span>
                            </Link>
                        </li>

                        {/* Tasks */}
                        <li>
                            <Link to={"/admin/tasks"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tasks">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 11l3 3L22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                                <span className="is-drawer-close:hidden">Tasks</span>
                            </Link>
                        </li>

                        {/* Team Members */}
                        <li>
                            <Link to={"/admin/team-members"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Team Members">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 21a8 8 0 0 0-16 0" />
                                    <circle cx="10" cy="8" r="5" />
                                    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
                                </svg>
                                <span className="is-drawer-close:hidden">Team Members</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
