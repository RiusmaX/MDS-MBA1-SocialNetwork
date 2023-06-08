import '../../styles/ChatSendingForm.scss'
import { Formik, Form, Field, useField } from 'formik'
import { AiOutlineSend, AiFillFileImage } from 'react-icons/ai'
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
  return (
    <div>
      <AiFillFileImage size={24} onClick={handleFile} style={{ cursor: 'pointer' }} />
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
          const response = await fetch(`${process.env.REACT_APP_API_UPLOAD_URL}`, {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const data = await response.json()
          mediaIds.push(data[0].id)
        }
        const isoString = new Date().toISOString()
        createMessage({
          data: {
            messageText: values.messageText,
            sendDate: isoString,
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
          {errors.messageText && touched.messageText
            ? (
              <div style={{ color: 'red' }}>{errors.messageText}</div>
              )
            : null}
          <Box sx={{
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
          </Box>
        </Form>
      )}

    </Formik>
  )
}

export default ChatSendingForm
