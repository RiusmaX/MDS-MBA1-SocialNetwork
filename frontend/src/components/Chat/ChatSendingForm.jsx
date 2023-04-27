import '../../styles/ChatSendingForm.scss'
import { ADD_CHAT_MESSAGE } from '../../graphql/mutations/chatsMutations'
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/client'
import { ReactComponent as Logo } from '../../assets/icons/send.svg'



const ChatSendingForm = () => {

  const [addMessage, { data, loading, error }] = useMutation(ADD_CHAT_MESSAGE)

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
      onSubmit={async (values) => {
        addMessage({ variables: { messageInput: {messageText: values.messageText, sendDate: "2023-04-12T22:04:00.000Z", users_permissions_user: 1, chat: 1, publishedAt: "2023-04-12T22:04:00.000Z"} } })
        //const messageInput = {  messageText: values.messageText, sendDate: Date.now(), users_permissions_user: 1, chat: 1}
        //const { data, loading, error } = useMutation(ADD_CHAT_MESSAGE(messageInput))

        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting }) => (
        <Form className='ChatSendingForm'>
          <Field rows='5' name="messageText" className='ChatEntryField'/>


          <button className='ChatSendButton' type="submit">
            <Logo stroke='white' />
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ChatSendingForm
