const SubmitButton = ({ label }) => {
  /*
  * InputContainer
  *    - renders a div with a className of 'input-container'
  *    - renders an input with a className of 'input' and a value of the prop 'label' or an empty string
  */
  return (
    <div className='input-container'>
      <input type='submit' className='input' value={label || ''} />
    </div>
  )
}

export default SubmitButton
