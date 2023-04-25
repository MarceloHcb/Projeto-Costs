import styles from './SubmitButton.module.css'

export default function SubmitButton({ text, disabled }) {
  return (
    <div>
    <button disabled={disabled} className={styles.btn}>{text}</button>        
    </div>
  )
}
