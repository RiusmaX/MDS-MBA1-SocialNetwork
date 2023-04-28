import '../../styles/ChatSendingForm.scss'
import { ADD_CHAT_MESSAGE } from '../../graphql/mutations/chatsMutations'
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client'
import { AiOutlineSend } from "react-icons/ai";
import React, { useState } from "react";
import * as Yup from 'yup';
import { createMessage } from '../../services/Api';
import { Box } from '@mui/material'

const ChatSendingForm = (chatId) => {

  const [addMessage, { data, loading, error }] = useMutation(ADD_CHAT_MESSAGE)
  const [date, setDate] = useState(new Date());

  const messageSchema = Yup.object().shape({
    messageText: Yup.string()
      .min(1, 'Le message est trop court!')
      .required('Un message est requis!'),
  });

  if (error) {
    return (
      <>
        <h1>ERROR</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    )
  }

  return (
    <Formik
      initialValues={{
        messageText: '',
      }}
      validationSchema={messageSchema}
      onSubmit={async (values, actions) => {
        const isoString = date.toISOString();
        //TODO  remplacer users_permissions_user: 1 par l'utilisateur courant
        createMessage({
          data: {
            messageText: values.messageText,
            sendDate: isoString,
            users_permissions_user: 1,
            chat: parseInt(chatId.chatId)
          }
        })
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
         <Form className='ChatSendingForm'>
          {errors.messageText && touched.messageText ? (
             <div style={{color: "red"}}>{errors.messageText}</div>
           ) : null}
           <Box sx={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              margin: 2
            }}>
           <Field name="messageText"className='ChatEntryField' />
           <button className='ChatSendButton' type="submit">
            <AiOutlineSend color='white' />
          </button>
           </Box>
         </Form>
       )}

    </Formik>
  )
}

export default ChatSendingForm
