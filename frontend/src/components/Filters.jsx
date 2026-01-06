import React from 'react'
import { CalendarRange } from 'lucide-react'

const Filters = ({ filters, onChange, onApply }) => {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-accent/15 text-accent">
          <CalendarRange size={18} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Filter attendance</p>
          <h3 className="font-semibold">Reports Filters</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="form-control">
          <label className="label">Day</label>
          <input
            type="date"
            className="input input-bordered"
            value={filters.date}
            onChange={(e) => update('date', e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Week (pick any date in week)</label>
          <input
            type="date"
            className="input input-bordered"
            value={filters.week}
            onChange={(e) => update('week', e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Month</label>
          <input
            type="month"
            className="input input-bordered"
            value={filters.month}
            onChange={(e) => update('month', e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Gender</label>
          <select className="select select-bordered" value={filters.gender} onChange={(e) => update('gender', e.target.value)}>
            <option value="all">All</option>
            <option value="Girl">Girls</option>
            <option value="Boy">Boys</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">Class</label>
          <input
            className="input input-bordered"
            placeholder="e.g., 3"
            value={filters.className}
            onChange={(e) => update('className', e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary soft-hover" onClick={onApply}>Apply Filter</button>
        <button className="btn btn-ghost" onClick={() => onChange({ date: '', week: '', month: '', gender: 'all', className: '' })}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Filters

