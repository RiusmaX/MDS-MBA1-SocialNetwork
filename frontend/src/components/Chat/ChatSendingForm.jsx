import '../../styles/ChatSendingForm.scss'
import { ADD_CHAT_MESSAGE } from '../../graphql/mutations/chatsMutations'
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client'
import { ReactComponent as Logo } from '../../assets/icons/send.svg'
import React, { useState } from "react";
import * as Yup from 'yup';





const ChatSendingForm = (chatId) => {

  const [addMessage, { data, loading, error }] = useMutation(ADD_CHAT_MESSAGE)
  const [date, setDate] = useState(new Date());



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
      onSubmit={async (values, actions) => {
        const isoString = date.toISOString();
        //TODO  remplacer users_permissions_user: 1 par l'utilisateur courant
        addMessage({ variables: { messageInput: {messageText: values.messageText, sendDate: isoString, users_permissions_user: 1, chat: parseInt(chatId.chatId), publishedAt: isoString} } })
        actions.resetForm();
      }}
    >
    <Form className='ChatSendingForm'>
          <Field rows='5' name="messageText" className='ChatEntryField'/>
          <button className='ChatSendButton' type="submit">
            <Logo stroke='white' />
          </button>
        </Form>
    </Formik>
  )
}

export default ChatSendingForm
