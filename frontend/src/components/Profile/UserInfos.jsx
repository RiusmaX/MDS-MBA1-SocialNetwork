const UserInfos = ({ email, phone }) => {
  return (
    <div className='userInfos'>
      <p>📧 {email}</p>
      <p>☎️ {phone}</p>
    </div>
  )
}

export default UserInfos
