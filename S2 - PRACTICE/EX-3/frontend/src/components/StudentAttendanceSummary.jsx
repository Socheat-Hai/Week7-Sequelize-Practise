import { useState } from 'react'

export default function StudentAttendanceSummary({ api }) {
  const [studentId, setStudentId] = useState('')
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSummary(null)

    try {
      const res = await fetch(`${api}/students/${studentId}/attendance`)
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setSummary(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Student Attendance Summary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input type="number" value={studentId} onChange={e => setStudentId(e.target.value)} required />
        </div>
        <button type="submit">Get Summary</button>
      </form>

      {error && <p className="error">{error}</p>}
      {summary && (
        <div className="result">
          <h3>{summary.student}</h3>
          <div className="summary-grid">
            <div className="summary-card total">
              <div className="number">{summary.summary.total}</div>
              <div className="label">Total</div>
            </div>
            <div className="summary-card present">
              <div className="number">{summary.summary.present}</div>
              <div className="label">Present</div>
            </div>
            <div className="summary-card absent">
              <div className="number">{summary.summary.absent}</div>
              <div className="label">Absent</div>
            </div>
            <div className="summary-card late">
              <div className="number">{summary.summary.late}</div>
              <div className="label">Late</div>
            </div>
          </div>

          <h4>All Records</h4>
          <table>
            <thead>
              <tr><th>ID</th><th>Class</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {summary.records.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.Class?.name}</td>
                  <td>{r.date}</td>
                  <td className={`status-${r.status}`}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
