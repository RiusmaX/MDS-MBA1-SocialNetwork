import '../../styles/ChatSendingForm.scss'

import ChatEntryField from './ChatEntryField'
import ChatSendButton from './ChatSendButton'

const ChatSendingForm = () => {
  return (
    <form className='ChatSendingForm'>
      <ChatEntryField />
      <ChatSendButton />
    </form>
  )
}

export default ChatSendingForm
