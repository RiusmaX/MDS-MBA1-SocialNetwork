import FullName from "../Profile/FullName"
import '../../styles/Users.scss'

const UserListItem = ({user, onClick}) => {
  return (
    <div className="card" onClick={onClick}>
      <FullName {...user.attributes} />
    </div>
  )
}

export default UserListItem