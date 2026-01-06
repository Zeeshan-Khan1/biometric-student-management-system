import React from 'react'

const accentClasses = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  accent: 'bg-accent/15 text-accent'
}

const StatCard = ({ title, value, icon, accent = 'primary', subtitle }) => {
  return (
    <div className="glass-card p-4 soft-hover h-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-neutral">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-2xl shadow-inner ${accentClasses[accent] || accentClasses.primary}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard

