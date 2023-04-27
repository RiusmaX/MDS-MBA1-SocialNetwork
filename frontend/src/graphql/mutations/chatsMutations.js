import { gql } from '@apollo/client'

const ADD_CHAT_MESSAGE = gql`
mutation createMessage($messageInput: MessageInput! ) {
    createMessage(data: $messageInput) {
			data{
        id
      }
    }
  }
`

export {
    ADD_CHAT_MESSAGE
}
