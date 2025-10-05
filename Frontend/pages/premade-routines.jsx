import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import styles from '../styles/PremadeRoutines.module.css'

export default function PremadeRoutines() {
  const router = useRouter()
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/')
      return
    }
    fetchRoutines()
  }, [router])

  const fetchRoutines = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await axios.get(`${API_URL}/api/routines/premade`)
      setRoutines(response.data)
    } catch (err) {
      setError('Failed to load routines')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStartWorkout = async (routine) => {
    try {
      const token = Cookies.get('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      
      await axios.post(
        `${API_URL}/api/workouts`,
        {
          routineId: routine._id,
          duration: parseInt(routine.duration) || 45,
          notes: `Completed ${routine.name}`
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      
      alert('Workout logged successfully!')
    } catch (err) {
      alert('Failed to log workout')
      console.error(err)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading routines...</div>
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push('/workout-selection')} className={styles.backBtn}>
          ← Back
        </button>
        <h1>Premade Routines</h1>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}
        
        {routines.length === 0 ? (
          <div className={styles.noRoutines}>
            <p>No premade routines available yet.</p>
            <p>Check back later or create your own custom routine!</p>
          </div>
        ) : (
          <div className={styles.routinesGrid}>
            {routines.map((routine) => (
              <div key={routine._id} className={styles.routineCard}>
                <div className={styles.routineHeader}>
                  <h3>{routine.name}</h3>
                  <span className={`${styles.badge} ${styles[routine.difficulty]}`}>
                    {routine.difficulty}
                  </span>
                </div>
                
                <p className={styles.description}>{routine.description}</p>
                
                <div className={styles.routineInfo}>
                  <span>⏱️ {routine.duration}</span>
                  <span>📁 {routine.category}</span>
                </div>

                <div className={styles.exercises}>
                  <h4>Exercises:</h4>
                  <ul>
                    {routine.exercises?.map((exercise, idx) => (
                      <li key={idx}>
                        {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className={styles.startBtn}
                  onClick={() => handleStartWorkout(routine)}
                >
                  Start Workout
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
