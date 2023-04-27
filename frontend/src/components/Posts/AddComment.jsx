import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../../graphql/mutations/commentMutations'
import '../../styles/AddComment.scss'

const AddComment = ({ relativeToId, userData }) => {
  const [content, setContent] = useState('')
  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setContent('')
    }
  })

  // Ajoute le commentaire à la base de donnée si le contenu n'est pas vide
  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (content.trim() === '') return

    addComment({
      variables: { content, userId: userData.id, relativeToId }
    })
  }

  return (
    <form onSubmit={handleSubmitComment} className='addCommentContainer'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Ajouter un commentaire'
        className='addComment'
      />
      <button type='submit'>Envoyer</button>
    </form>
  )
}

export default AddComment
