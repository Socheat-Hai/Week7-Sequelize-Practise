import { useState } from 'react'

export default function ClassAttendance({ api }) {
  const [classId, setClassId] = useState('')
  const [records, setRecords] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setRecords(null)

    try {
      const res = await fetch(`${api}/classes/${classId}/attendance`)
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setRecords(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Class Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Class ID</label>
          <input type="number" value={classId} onChange={e => setClassId(e.target.value)} required />
        </div>
        <button type="submit">List Attendance</button>
      </form>

      {error && <p className="error">{error}</p>}
      {records && (
        <div className="result">
          <h3>Attendance for Class #{classId}</h3>
          <table>
            <thead>
              <tr><th>ID</th><th>Student Name</th><th>Email</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.Student?.name}</td>
                  <td>{r.Student?.email}</td>
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
