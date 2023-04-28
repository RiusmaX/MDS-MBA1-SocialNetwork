import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../../graphql/mutations/commentMutations'
import '../../styles/AddComment.scss'
import Button from '../Layout/Button'
import { useAuth } from '../contexts/AuthContext'

const AddComment = ({ relativeToId, addComment }) => {
  const { state: { user } } = useAuth()

  const [content, setContent] = useState('')

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    onCompleted: (data) => {
      const newComment = data.createPost.data
      setContent('')
      addComment(newComment)
    }
  })

  // Ajoute le commentaire à la base de donnée si le contenu n'est pas vide
  const handleSubmitComment = () => {
    if (content.trim() === '') return

    addCommentMutation({
      variables: { content, userId: user.id, relativeToId }
    })
  }

  return (
    <div className='addCommentContainer'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Ajouter un commentaire'
        className='addCommentInput'
      />
      <Button onClick={handleSubmitComment} value='Envoyer' className='bold' />
    </div>
  )
}

export default AddComment
