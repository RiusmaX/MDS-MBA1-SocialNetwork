import { useEffect, useState } from 'react'
import '../../styles/Avatar.scss'

const Avatar = ({ avatar }) => {
  const [counter, setCounter] = useState(0)
  const [className, setClassName] = useState('')

  // Gestion du clique
  const onClick = () => {
    setCounter(counter + 1)
    // Si le nombre de clique atteint 5, surprise
    if (counter === 5 && !(className.includes('animation')) && !(className.includes('disco'))) {
      // l'image rotationne
      setClassName(' animation')
      setTimeout(() => {
        const newClassName = className.replace(' animation', '')
        setClassName(newClassName)
      }, 3000)
    }
    if (counter === 10 && !(className.includes('disco'))) {
      // l'image fait le disco
      setClassName(' disco')
      setTimeout(() => {
        const newClassName = className.replace(' disco', '')
        setClassName(newClassName)
      }, 10000)
    }
  }

  useEffect(() => {
    if (counter === 1) {
      setTimeout(() => {
        setCounter(0)
      }, 3000)
    }
  }, [counter])

  return (
    <img
      className={`avatar ${className}`}
      src={`${process.env.REACT_APP_IMAGES_URL}${avatar.url}`}
      onClick={onClick}
    />
  )
}

export default Avatar
