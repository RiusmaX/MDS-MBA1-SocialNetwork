import '../../styles/ChatSendingForm.scss'
import { Formik, Form, Field, useField } from 'formik'
import { AiOutlineSend, AiFillFileImage, AiFillAudio } from 'react-icons/ai'
import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { createMessage } from '../../services/Api'
import { Box } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

const FileUpload = ({ fileRef, ...props }) => {
  const [field, meta] = useField(props)
  const handleFile = () => {
    fileRef.current.click()
  }
  let fileArr = []
  const files = fileRef?.current?.files
  if (files) {
    fileArr = Array.from(files)
  }
  return (
    <div>
      <AiFillFileImage size={24} onClick={handleFile} style={{ cursor: 'pointer' }} />
      <span>{fileArr.length}</span>
      <input ref={fileRef} multiple type='file' hidden {...field} />
      {meta.touched && meta.error
        ? (
          <div style={{ color: 'red' }}>{meta.error}</div>
          )
        : null}
    </div>
  )
}

const ChatSendingForm = (chatId) => {
  const { state: { user, token } } = useAuth()
  const fileRef = useRef(null)
  const audioRef = useRef(null)

  const [isRecording, setIsRecording] = useState(false)

  const handleRecordStart = async () => {
    setIsRecording(true)

    // Vérifie si le navigateur prend en charge l'API Web Audio
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
        const mediaRecorder = new MediaRecorder(stream)
        const chunks = []

        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        })

        mediaRecorder.addEventListener('stop', async () => {
          const blob = await new Blob(chunks, { type: 'audio/wav' })

          // Mettre à jour le state avec l'URL de l'enregistrement audio

          await uploadAudioToServer(blob)
        })

        mediaRecorder.start()
        audioRef.current = mediaRecorder
      } catch (error) {
        console.error('Error accessing microphone:', error)
        setIsRecording(false)
      }
    } else {
      console.error('Web Audio API not supported by the browser')
      setIsRecording(false)
    }
  }

  const handleRecordStop = async () => {
    setIsRecording(false)

    if (audioRef.current && audioRef.current.state === 'recording') {
      await audioRef.current.stop()
    }
  }

  const uploadAudioToServer = async (blob) => {
    const formData = new FormData()
    const file = new File([blob], 'audio.wav', {
      type: 'audio/wav',
      lastModified: Date.now()
    })
    formData.append('files', file, 'audio.wav')

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}${process.env.REACT_APP_STRAPI_UPLOAD_URL}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem('AUTH'))
              ?.token
              ? `Bearer ${
                  JSON.parse(window.localStorage.getItem('AUTH'))?.token
                }`
              : null
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        const audioId = data[0].id // Récupérez l'ID de l'enregistrement audio créé dans Strapi

        // Enregistrez l'ID de l'enregistrement audio dans le chat
        await createMessage({
          data: {
            messageText: '',
            sendDate: new Date().toISOString(),
            users_permissions_user: user.id,
            chat: parseInt(chatId.chatId),
            media: [audioId]
          }
        })
        // setAudioBlob(null);
      } else {
        console.error('Failed to upload audio:', response.statusText)
      }
    } catch (error) {
      console.error('Error uploading audio:', error)
    }
  }

  const messageSchema = Yup.object(({
    messageText: Yup.string()
      .min(1, 'Le message est trop court!')
      .required('Un message est requis!'),
    files: Yup.mixed()
      .test('is-file-too-big', 'File exceeds 10MB', () => {
        let valid = true
        const files = fileRef?.current?.files
        if (files) {
          const fileArr = Array.from(files)
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024
            if (size > 10) {
              valid = false
            }
          })
        }
        return valid
      })
      .test(
        'is-file-of-correct-type',
        'File is not of supported type',
        () => {
          let valid = true
          const files = fileRef?.current?.files
          if (files) {
            const fileArr = Array.from(files)
            fileArr.forEach((file) => {
              const type = file.type.split('/')[1]
              const validTypes = [
                'jpeg',
                'png',
                'jpg'
              ]
              if (!validTypes.includes(type)) {
                valid = false
              }
            })
          }
          return valid
        }
      )
  }))

  return (
    <Formik
      initialValues={{
        messageText: '',
        files: ''
      }}
      validationSchema={messageSchema}
      onSubmit={async (values, actions) => {
        const files = fileRef?.current?.files
        const fileArr = Array.from(files)
        const mediaIds = []
        for (const file of fileArr) {
          const formData = new FormData()
          formData.append('files', file)

          // Upload le média sur Strapi
          const response = await fetch(`${process.env.REACT_APP_BACKEND}${process.env.REACT_APP_STRAPI_UPLOAD_URL}`, {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const data = await response.json()
          mediaIds.push(data[0].id)
        }
        createMessage({
          data: {
            messageText: values.messageText,
            sendDate: new Date().toISOString(),
            users_permissions_user: user.id,
            chat: parseInt(chatId.chatId),
            media: mediaIds
          }
        })
        actions.resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {errors.messageText && touched.messageText && (
            <div style={{ color: 'red' }}>{errors.messageText}</div>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              margin: 2
            }}
          >
            <Field name='messageText' className='ChatEntryField' />
            <FileUpload name='files' fileRef={fileRef} />
            <button className='ChatSendButton' type='submit'>
              <AiOutlineSend color='white' />
            </button>
            {isRecording
              ? (
                <button
                  className='ChatSendButton Recording'
                  onMouseUp={handleRecordStop}
                >
                  Stop Recording
                </button>
                )
              : (
                <button
                  className='ChatSendButton'
                  type='button'
                  onMouseDown={handleRecordStart}
                >
                  <AiFillAudio color='white' />
                </button>
                )}
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ChatSendingForm
