import '../../styles/ChatSendingForm.scss'
import { Formik, Form, Field } from 'formik'
import { AiOutlineSend } from 'react-icons/ai'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { createMessage } from '../../services/Api'
import { Box } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

const ChatSendingForm = (chatId) => {
  const [date, setDate] = useState(new Date())

  const { state: { user } } = useAuth()

  const messageSchema = Yup.object().shape({
    messageText: Yup.string()
      .min(1, 'Le message est trop court!')
      .required('Un message est requis!')
  })

  return (
    <Formik
      initialValues={{
        messageText: ''
      }}
      validationSchema={messageSchema}
      onSubmit={async (values, actions) => {
        const isoString = date.toISOString()
        createMessage({
          data: {
            messageText: values.messageText,
            sendDate: isoString,
            users_permissions_user: user.id,
            chat: parseInt(chatId.chatId)
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
