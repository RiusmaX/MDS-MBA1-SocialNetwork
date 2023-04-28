import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { format } from 'date-fns'

const Bubble = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: alpha(theme.palette.common.black, 0.24),
  borderRadius: theme.spacing(1)
}))

const MyBubble = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.light, 0.24),
  borderRadius: theme.spacing(1)
}))

export const ChatBubble = ({
  reverse,
  isMySelf,
  author,
  content,
  date
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2} padding={2}>
      <Box display='flex' style={{ flexDirection: reverse ? 'row-reverse' : '' }}>
        <Typography variant='body2'>
          {`${author?.username} - ${format(new Date(date), 'dd/MM/yyyy')}`}
        </Typography>
      </Box>
      <Box display='flex' gap={2} style={{ flexDirection: reverse ? 'row-reverse' : '' }}>
        <Avatar alt={author?.username} src={`${process.env.REACT_APP_IMAGES_URL}${author?.avatar?.data?.attributes?.url}`} />
        {isMySelf
          ? (
            <MyBubble>
              {content}
            </MyBubble>
            )
          : (
            <Bubble padding={4}>{content}</Bubble>
            )}
      </Box>
    </Box>
  )
}

export default ChatBubble
