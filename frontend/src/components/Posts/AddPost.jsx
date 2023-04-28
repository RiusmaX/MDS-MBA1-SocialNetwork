import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_POST } from '../../graphql/mutations/postMutations'
import Button from '../Layout/Button'
import '../../styles/AddPost.scss'

const AddPost = ({ userData }) => {
  const [content, setContent] = useState('')

  const [addPostMutation] = useMutation(ADD_POST, {
    onCompleted: () => {
      setContent('')
    }
  })

  const handleSubmitPost = () => {
    if (content.trim() === '') return

    addPostMutation({
      variables: { content, userId: userData.id }
    })
  }

  return (
    <div className='addPostContainer'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Ajouter un post'
        className='addPostInput'
      />
      <Button onClick={handleSubmitPost} value='Envoyer' className='bold' />
    </div>
  )
}

export default AddPost
