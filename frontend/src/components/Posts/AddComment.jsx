import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../../graphql/mutations/commentMutations'

const AddComment = () => {
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
      variables: { content, userId: 1, relativeToId: 1 }
    })
  }

  return (
    <form onSubmit={handleSubmitComment}>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Ajouter un commentaire'
      />
      <button type='submit'>Envoyer</button>
    </form>
  )
}

export default AddComment
