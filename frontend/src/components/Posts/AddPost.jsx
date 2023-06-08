import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_POST } from '../../graphql/mutations/postMutations'
import Button from '../Layout/Button'
import '../../styles/AddPost.scss'
import DragAndDropFiles from '../Global/Input/DragAndDropFiles'

const AddPost = ({ userData }) => {
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])

  const [addPostMutation] = useMutation(ADD_POST, {
    onCompleted: () => {
      setContent('')
      setFiles([])
    }
  })

  const handleSubmitPost = async () => {
    if (content.trim() === '') return //Verifie que le contenu n'est pas vide

    let mediaIds = [];
    if (files.length > 0) {
      for (const file of files) {
        const formData = new FormData()
        formData.append('files', file)

        // Upload le média sur Strapi
        const response = await fetch(`${process.env.REACT_APP_API_UPLOAD_URL}`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
          }
        })

        const data = await response.json()
        mediaIds.push(data[0].id)
      }
    }

    //Ajoute le post avec le média
    addPostMutation({
      variables: { content, userId: userData.id, media: mediaIds }
    })
  }

  const handleDrop = (acceptedFiles) => {
    if (files.length === 0) {
      setFiles(acceptedFiles)
    } else {
      setFiles([acceptedFiles[0]])
    }
  }

  return (
    <div className='addPostContainer'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Écrire le contenu de votre post...'
        className='addPostInput'
      />
      <DragAndDropFiles files={files} handleDrop={handleDrop} />
      <Button onClick={handleSubmitPost} value='Envoyer' className='bold' />
    </div>
  )
}

export default AddPost
