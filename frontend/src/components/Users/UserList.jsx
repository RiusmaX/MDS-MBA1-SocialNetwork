import { useNavigate } from "react-router-dom"
import UserListItem from "./UserListItem"

const UserList = ({ users }) => {
  const navigate = useNavigate()

  if (!users || users.length < 1) {
    return <h4>No data...</h4>
  }

  return (
    <div className='listContainer'>
      {
        users.map(user => {
          return (
            <UserListItem 
              key={user.id} 
              user={user} 
              onClick={() => navigate(`/profile/${user.id}`)} 
            />
          )
        })
      }
    </div>
  )
}

export default UserList