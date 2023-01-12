const FullName = ({ firstName, lastName, username }) => {
  return (
    <div className='fullName'>
      <p>{`${firstName} ${lastName} (@${username})`}</p>
    </div>
  )
}

export default FullName
