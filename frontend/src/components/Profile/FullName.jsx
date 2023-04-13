const FullName = ({ firstName, lastName, username }) => {
  return (
    <div className='fullName'>
      <p className='name'>{`${firstName} ${lastName}`}</p>
      <p className='pseudo'>{`@${username}`}</p>
    </div>
  )
}

export default FullName
