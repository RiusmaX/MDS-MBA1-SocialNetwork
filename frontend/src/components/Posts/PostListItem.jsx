import Avatar from '../Profile/Avatar'
import '../../styles/PostListItem.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsCalendarDate } from 'react-icons/bs'
import { format } from 'date-fns'
import useLikePost from '../../services/Likers'
import Lottie from 'lottie-react'
import partyAnimation from '../../assets/animations/party.json'
import sound from '../../assets/sounds/sound.mp3'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PostListItem = ({ post, seeDetails }) => {
  const navigate = useNavigate()

  const openDetail = () => {
    if (seeDetails) navigate(`/post/${post.id}`)
  }

  const { isLike, setIsLike, handleLikePost } = useLikePost(Number(post.id), 1)
  const [isAnimated, setIsAnimated] = useState(true)

  useEffect(() => {
    if (isLike) {
      setIsAnimated(true)
      const audio = new Audio(sound)
      audio.play()

      return () => {
        audio.pause()
      }
    }
  }, [isLike])

  return (
    <div className='postItem' style={{ position: 'relative', width: '100%' }}>
      {isLike && isAnimated && (
        <Lottie
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          animationData={partyAnimation}
          autoplay
          loop={false}
          onComplete={() => setIsAnimated(false)}
        />
      )}
      <div className='postItem-avatar'>
        {/* Here we pass the avatar object to the Avatar component */}
        <Avatar
          avatar={
            post.attributes?.user?.data?.attributes?.avatar?.data?.attributes
          }
        />
      </div>
      <div className='postItem-content'>
        <div onClick={openDetail} className={`${seeDetails ? 'pointerCursor' : ''}`}>
          <div className='postItem-content_pseudo'>
            {/* Display the username and firstname */}
            <h3>{post.attributes?.user?.data?.attributes?.username}</h3>
            <h4>{post.attributes?.user?.data?.attributes?.firstName}</h4>
          </div>
          {post.attributes?.medias?.data?.[0]?.attributes?.url && (
            <div className='postItem-content_image'>
              {/* Display the image */}
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}${post.attributes?.medias?.data?.[0]?.attributes?.url}`}
                alt={post.attributes?.image?.data?.attributes?.name}
              />
            </div>
          )}
          <div className='postItem-content_text'>
            {/* Display the content */}
            <p>{post.attributes?.content}</p>
          </div>
        </div>
        <div className='postItem-content_infos'>
          {/* Display the number of likes and the date of creation */}
          <p>
            {isLike
              ? (
                <AiFillHeart onClick={handleLikePost} />
                )
              : (
                <AiOutlineHeart onClick={handleLikePost} />
                )}

            {/* calculate the number of likes */}
            {post.attributes?.likers?.data?.length}
          </p>
          <p>
            <BsCalendarDate />
            {/* date format */}
            {format(new Date(post.attributes?.createdAt), 'dd/MM/yyyy')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostListItem
