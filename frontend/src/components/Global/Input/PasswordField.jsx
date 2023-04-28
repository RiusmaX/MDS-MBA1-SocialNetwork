
const PasswordField = ({ handleChange, placeholder = 'PASSWORD', name = 'password' }) => {
  return (
    <label htmlFor='password'>
      <input type='password' name='password' onChange={handleChange} placeholder={placeholder} />
    </label>
  )
}

export default PasswordField
