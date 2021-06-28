import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Posts() {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Post { id }</h1>
      </main>
    </div>
  )
}
