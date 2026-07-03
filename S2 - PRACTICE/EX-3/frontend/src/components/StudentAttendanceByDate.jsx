import { useState } from 'react'

export default function StudentAttendanceByDate({ api }) {
  const [studentId, setStudentId] = useState('')
  const [date, setDate] = useState('')
  const [records, setRecords] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setRecords(null)

    try {
      const res = await fetch(`${api}/attendance?studentId=${studentId}&date=${date}`)
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setRecords(Array.isArray(data) ? data : [data])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Student Attendance by Date</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input type="number" value={studentId} onChange={e => setStudentId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}
      {records && (
        <div className="result">
          <h3>Records for Student #{studentId} on {date}</h3>
          <table>
            <thead>
              <tr><th>ID</th><th>Class</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {records.map(r => (
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
