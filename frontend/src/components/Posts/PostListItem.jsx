import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { getExtract } from '../../utils/strings'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import Avatar from '../Profile/Avatar'

const PostListItem = ({ post }) => {
  return (
    <div className='postItem'>
      <div className='postItem-avatar'>
        {/* {console.log(post?.attributes?.user?.data?.attributes?.avatar?.data?.attributes)}
        <pre>{JSON.stringify(post.attributes?.user?.data?.attributes?.avatar?.data?.attributes)}</pre> */}
        <Avatar avatar={post.attributes?.user?.data?.attributes?.avatar?.data?.attributes} />
      </div>
      <div className='postItem-content'>
        <div className='postItem-content_pseudo'>
          <h3>{post.attributes?.user?.data?.attributes?.username}</h3>
          <h4>{post.attributes?.user?.data?.attributes?.firstName}</h4>
        </div>
        {post.attributes?.medias?.data?.[0]?.attributes?.url &&(
        <div className='postItem-content_image'>
          <img style={{width: "300px"}} src={`${process.env.REACT_APP_IMAGES_URL}${post.attributes?.medias?.data?.[0]?.attributes?.url}`} alt={post.attributes?.image?.data?.attributes?.name} />
        </div>
        )}
        <div className='postItem-content_text'>
          <p>{post.attributes?.content}</p>
        </div>
        <div className='postItem-content_infos'>
          <p>{post.attributes?.likers?.data?.[0]?.id}</p>
          <p>{new Date(post.attributes?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default PostListItem
