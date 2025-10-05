import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import styles from '../styles/WorkoutSelection.module.css'

export default function WorkoutSelection() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>💪 Gym Workout Tracker</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </header>

      <main className={styles.main}>
        <h2 className={styles.title}>Choose Your Workout</h2>
        
        <div className={styles.cardContainer}>
          <div 
            className={styles.card}
            onClick={() => router.push('/premade-routines')}
          >
            <div className={styles.cardIcon}>📋</div>
            <h3>Premade Routines</h3>
            <p>Choose from our collection of professionally designed workout routines</p>
          </div>

          <div 
            className={styles.card}
            onClick={() => router.push('/custom-routine')}
          >
            <div className={styles.cardIcon}>✏️</div>
            <h3>Custom Routine</h3>
            <p>Create your own personalized workout routine</p>
          </div>
        </div>
      </main>
    </div>
  )
}
