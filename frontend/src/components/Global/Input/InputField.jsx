const InputField = ({ type, handleChange, icon, placeholder, name, value }) => {
  const Icon = icon;
  return (
    /**
     * @param {string} type - The type of the input
     * @param {function} handleChange - The function to handle the change of the input
     * @param {string} icon - The icon of the input
     * @param {string} placeholder - The placeholder of the input
     * @param {string} name - The name of the input
     * @param {string} value - The value of the input
     * @returns {JSX.Element} - The input
     */
    <div className='input-container'>
      {icon && <Icon className='icon' color='white' />}
      <input type={type} placeholder={placeholder} className='input' name={name} onChange={handleChange} value={value} />
    </div>
  )
}

export default InputField
