import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import styles from '../styles/CustomRoutine.module.css'

export default function CustomRoutine() {
  const router = useRouter()
  const [routineData, setRoutineData] = useState({
    name: '',
    description: '',
    category: 'custom',
    difficulty: 'beginner',
    duration: '45 min'
  })
  const [exercises, setExercises] = useState([
    { name: '', sets: 3, reps: '10', rest: '60s', notes: '' }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/')
    }
  }, [router])

  const handleRoutineChange = (e) => {
    setRoutineData({
      ...routineData,
      [e.target.name]: e.target.value
    })
  }

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises]
    newExercises[index][field] = value
    setExercises(newExercises)
  }

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: '', sets: 3, reps: '10', rest: '60s', notes: '' }
    ])
  }

  const removeExercise = (index) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = Cookies.get('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

      const payload = {
        ...routineData,
        exercises: exercises.filter(ex => ex.name.trim() !== '')
      }

      await axios.post(
        `${API_URL}/api/routines`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert('Routine created successfully!')
      router.push('/workout-selection')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create routine')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push('/workout-selection')} className={styles.backBtn}>
          ← Back
        </button>
        <h1>Create Custom Routine</h1>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h2>Routine Details</h2>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name">Routine Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={routineData.name}
                onChange={handleRoutineChange}
                required
                placeholder="e.g., Upper Body Strength"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={routineData.description}
                onChange={handleRoutineChange}
                placeholder="Describe your routine..."
                rows="3"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={routineData.difficulty}
                  onChange={handleRoutineChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={routineData.duration}
                  onChange={handleRoutineChange}
                  placeholder="e.g., 45 min"
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Exercises</h2>
              <button 
                type="button" 
                onClick={addExercise}
                className={styles.addBtn}
              >
                + Add Exercise
              </button>
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className={styles.exerciseCard}>
                <div className={styles.exerciseHeader}>
                  <h3>Exercise {index + 1}</h3>
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className={styles.removeBtn}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Exercise Name *</label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    required
                    placeholder="e.g., Bench Press"
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Sets</label>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))}
                      min="1"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Reps</label>
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                      placeholder="e.g., 10 or 8-12"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Rest</label>
                    <input
                      type="text"
                      value={exercise.rest}
                      onChange={(e) => handleExerciseChange(index, 'rest', e.target.value)}
                      placeholder="e.g., 60s"
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Notes</label>
                  <input
                    type="text"
                    value={exercise.notes}
                    onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
            ))}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Routine'}
          </button>
        </form>
      </main>
    </div>
  )
}
