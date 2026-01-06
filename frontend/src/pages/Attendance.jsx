import React, { useState } from 'react'
import api from '../services/api'
import { Fingerprint, Clock3, CheckCircle2 } from 'lucide-react'

const Attendance = () => {
  const [fingerprint, setFingerprint] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const simulateScan = () => {
    setFingerprint(crypto.randomUUID())
  }

  const handlePunch = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post('/fingerprint/punch', { fingerprintTemplate: fingerprint })
      setResult(res.data)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not verify fingerprint'
      setError(msg)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/15 text-primary">
            <Fingerprint size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Attendance (Entry/Exit)</h1>
            <p className="text-sm text-gray-500">Scan fingerprint to mark entry or exit automatically.</p>
          </div>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="space-y-2">
          <label className="label">Fingerprint Template</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="input input-bordered flex-1"
              value={fingerprint}
              onChange={(e) => setFingerprint(e.target.value)}
              placeholder="Provide captured fingerprint template"
            />
            <button className="btn btn-secondary soft-hover" onClick={simulateScan}>
              Scan (Simulated)
            </button>
          </div>
        </div>
        <button className="btn btn-primary soft-hover" onClick={handlePunch} disabled={loading || !fingerprint}>
          {loading ? 'Processing...' : 'Submit Entry/Exit'}
        </button>
      </div>

      {result && (
        <div className="glass-card p-4 grid md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success" />
            <div>
              <p className="text-sm text-gray-500">Student</p>
              <p className="font-semibold">{result.student?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="text-primary" />
            <div>
              <p className="text-sm text-gray-500">Action</p>
              <p className="font-semibold capitalize">{result.action}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{result.attendance?.date}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Attendance

