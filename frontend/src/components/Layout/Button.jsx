
import '../../styles/Button.scss'

const Button = ({ value, onClick = null, className = '' }) => {
  return (
    <div className={'button ' + (className !== '' && className)} onClick={() => { onClick !== null && onClick() }}>
      {value}
    </div>
  )
}

export default Button
