import '../../styles/ChatSendButton.scss'
import { ReactComponent as Logo } from '../../assets/icons/send.svg'

const ChatSendButton = () => {
  return (
    <button className='ChatSendButton'>
      <Logo stroke='white' />
    </button>
  )
}

export default ChatSendButton
