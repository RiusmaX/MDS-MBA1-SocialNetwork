import { useRef } from 'react'
import '../../styles/Avatar.scss'

const Avatar = ({ avatar }) => {
  const image = useRef(null)
  // Compteur de clique
  let counter = 0

  // Gestion du clique
  const handlePress = () => {
    counter++
    // Si le nombre de clique atteint 5, surprise
    if (counter >= 5) {
      // l'image rotationne
      console.log('wouwh tu cliques vite')

      image.current.classList.add('animation')
      setTimeout(() => {
        if (image && image.current) {
          image.current.classList.remove('animation')
        }
      }, 5000)
    }
    setTimeout(() => {
      counter = 0
    }, 3000)
  }

  return (
    <img
      ref={image}
      className='avatar'
      src={`${process.env.REACT_APP_IMAGES_URL}${avatar.url}`}
      onClick={handlePress}
    />
  )
}

export default Avatar
