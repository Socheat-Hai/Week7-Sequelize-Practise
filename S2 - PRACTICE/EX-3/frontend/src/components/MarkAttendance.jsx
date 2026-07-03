import { useState } from 'react'

export default function MarkAttendance({ api }) {
  const [studentId, setStudentId] = useState('')
  const [classId, setClassId] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('present')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    try {
      const res = await fetch(`${api}/attendance?studentId=${studentId}&date=${date}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: Number(classId), status })
      })

      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input type="number" value={studentId} onChange={e => setStudentId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Class ID</label>
          <input type="number" value={classId} onChange={e => setClassId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <p className="success">Attendance recorded!</p>
          <table>
            <thead>
              <tr><th>ID</th><th>Student ID</th><th>Class ID</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.id}</td>
                <td>{result.studentId}</td>
                <td>{result.classId}</td>
                <td>{result.date}</td>
                <td className={`status-${result.status}`}>{result.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
