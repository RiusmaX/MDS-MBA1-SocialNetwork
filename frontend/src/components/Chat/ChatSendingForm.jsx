import '../../styles/ChatSendingForm.scss'

import ChatEntryField from './ChatEntryField'
import ChatSendButton from './ChatSendButton'

const ChatSendingForm = () => {
  return (
    <form class='ChatSendingForm'>
      <ChatEntryField />
      <ChatSendButton />
    </form>
  )
}

export default ChatSendingForm
