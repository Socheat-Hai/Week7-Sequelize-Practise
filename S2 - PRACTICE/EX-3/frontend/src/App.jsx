import { useState } from 'react'
import MarkAttendance from './components/MarkAttendance'
import StudentAttendanceByDate from './components/StudentAttendanceByDate'
import ClassAttendance from './components/ClassAttendance'
import StudentAttendanceSummary from './components/StudentAttendanceSummary'
import './App.css'

const API = 'http://localhost:3333'

export default function App() {
  const [tab, setTab] = useState('mark')

  return (
    <div className="app">
      <header>
        <h1>Attendance Tracker</h1>
        <nav>
          <button onClick={() => setTab('mark')} data-active={tab === 'mark'}>Mark Attendance</button>
          <button onClick={() => setTab('student-date')} data-active={tab === 'student-date'}>Student by Date</button>
          <button onClick={() => setTab('class')} data-active={tab === 'class'}>Class Attendance</button>
          <button onClick={() => setTab('summary')} data-active={tab === 'summary'}>Student Summary</button>
        </nav>
      </header>
      <main>
        {tab === 'mark' && <MarkAttendance api={API} />}
        {tab === 'student-date' && <StudentAttendanceByDate api={API} />}
        {tab === 'class' && <ClassAttendance api={API} />}
        {tab === 'summary' && <StudentAttendanceSummary api={API} />}
      </main>
    </div>
  )
}
