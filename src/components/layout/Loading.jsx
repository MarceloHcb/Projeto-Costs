import styles from './Loading.module.css'
import loading from '../../images/loading.svg'

export default function Loading() {
  return (
    <div className={styles.loader_container}>
      <img src={loading} alt="Loading" className={styles.loader} />
    </div>
  )
}
