import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { getExtract } from '../../utils/strings'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

const PostListItem = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        //   avatar={
        //     <Avatar
        //       src={process.env.REACT_APP_IMAGES_URL + user.attributes.avatar.data.attributes.url}
        //       sx={{ bgcolor: blueGrey[500] }}
        //       aria-label='recipe'
        //     >
        //       T
        //     </Avatar>
        // }
        title={post.attributes.title}
      />
      <CardMedia
        component='img'
        height='200'
        image={process.env.REACT_APP_IMAGES_URL + post.attributes?.medias?.data[0]?.attributes?.url}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {getExtract(post.attributes.content)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>
          Lire l'article
        </Button>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostListItem
