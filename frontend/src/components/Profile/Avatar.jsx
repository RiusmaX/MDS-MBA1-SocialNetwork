import { useEffect, useRef, useState } from 'react'
import '../../styles/Avatar.scss'

const Avatar = ({ avatar }) => {
  const image = useRef(null)
  const [counter, setCounter] = useState(0)

  // Gestion du clique
  const handleClick = () => {
    setCounter(counter + 1)
    // Si le nombre de clique atteint 5, surprise
    if (counter >= 5) {
      // l'image rotationne
      image.current.classList.add('animation')
      setTimeout(() => {
        if (image && image.current) {
          image.current.classList.remove('animation')
        }
      }, 3000)
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
      ref={image}
      className='avatar'
      src={`${process.env.REACT_APP_IMAGES_URL}${avatar.url}`}
      onClick={handleClick}
    />
  )
}

export default Avatar
