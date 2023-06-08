import { useEffect, useState } from 'react'
import '../../styles/Avatar.scss'

const Avatar = ({ avatar }) => {
  const [counter, setCounter] = useState(0)
  const [classname, setClassname] = useState('')

  // Gestion du clique
  const handleClick = () => {
    setCounter(counter + 1)
    // Si le nombre de clique atteint 5, surprise
    if (counter >= 5) {
      // l'image rotationne
      setClassname('animation')
      setTimeout(() => {
        setClassname('')
      }, 3000)
    }
  }

  // Reset du compteur
  useEffect(() => {
    if (counter === 1) {
      setTimeout(() => {
        setCounter(0)
      }, 3000)
    }
  }, [counter])

  return avatar && (
    <img
      className={`avatar ${classname}`}
      src={`${process.env.REACT_APP_BACKEND}${avatar?.url}`}
      onClick={handleClick}
      alt=''
    />
  )
}

export default Avatar
