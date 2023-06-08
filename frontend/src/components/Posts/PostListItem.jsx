import Avatar from '../Profile/Avatar'
import '../../styles/PostListItem.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsCalendarDate } from 'react-icons/bs'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { FiSave } from 'react-icons/fi'
import { format } from 'date-fns'
import useLikePost from '../../services/Likers'
import Lottie from 'lottie-react'
import partyAnimation from '../../assets/animations/party.json'
import sound from '../../assets/sounds/sound.mp3'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FacebookIcon, FacebookShareButton, OKIcon, OKShareButton, OKShareCount, TwitterIcon, TwitterShareButton } from 'react-share'
import { useAuth } from '../../contexts/AuthContext'
import { UPDATE_COMMENT, DELETE_COMMENT } from '../../graphql/mutations/commentMutations'
import { useMutation } from '@apollo/client'

const PostListItem = ({ post, seeDetails }) => {
  const navigate = useNavigate()
  const currenturl = window.location.href

  const openDetail = () => {
    if (seeDetails) navigate(`/post/${post.id}`)
  }

  const { state: { user, token } } = useAuth()

  const [isEditing, setEditing] = useState(false)

  const { isLike, setIsLike, handleLikePost } = useLikePost(Number(post.id), 1)
  const [isAnimated, setIsAnimated] = useState(true)

  const [text, setText] = useState(post.attributes?.content)
  const [updatePost] = useMutation(UPDATE_COMMENT)
  const [deletePost] = useMutation(DELETE_COMMENT, {
    context: {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  })

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    updatePost({
      variables: {
        postId: post.id,
        content: text
      }
    })
    setEditing(false)
  }

  const handleDelete = () => {
    deletePost({
      variables: {
        postId: post.id
      }
    })

    window.location.reload(false)
  }

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
                src={`${process.env.REACT_APP_BACKEND}${post.attributes?.medias?.data?.[0]?.attributes?.url}`}
                alt={post.attributes?.image?.data?.attributes?.name}
              />
            </div>
          )}
          <div className='postItem-content_text'>
            {/* Display the content */}
            {isEditing
              ? (
                <div className='updatePost'>
                  <input type='text' class='updatePostInput' value={text} onChange={handleChange} />
                  <button value='enregistrer' className='save' onClick={handleUpdate}>
                    <span className='react-icon'>
                      <FiSave />
                    </span>
                  </button>
                </div>
                )
              : (
                <p>{text}</p>
                )}
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
          {post.attributes?.user?.data?.id === user.id
            ? (<p><BiPencil onClick={() => setEditing(true)} /></p>)
            : null}
          {post.attributes?.user?.data?.id === user.id
            ? (<p><BiTrash onClick={() => handleDelete()} /></p>)
            : null}
          <TwitterShareButton
            url={currenturl + post.id}
            hashtags={['MBA1', 'MyDigitalSchool', 'ReactJS']}
            title='Check this post, it is awesome !'
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={`${process.env.REACT_APP_URL}/post/${post.id}`}
            hashtag='#MBA1 #MyDigitalSchool #ReactJS'
            quote='Check this post, it is awesome !'
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <OKShareButton
            url={`${process.env.REACT_APP_URL}/post/${post.id}`}
            title='Check this post, it is awesome !'
            image={`${process.env.REACT_APP_BACKEND}${post.attributes?.medias?.data?.[0]?.attributes?.url}`}
          >
            <OKIcon size={32} round />
          </OKShareButton>
        </div>
      </div>
    </div>
  )
}

export default PostListItem
