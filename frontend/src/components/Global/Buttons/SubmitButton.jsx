const SubmitButton = (props) => {
  /**
   * @param {string} label - The label of the button
   * @returns {JSX.Element} - The button
   */
  return (
    <div className='input-container'>
      <input {...props} type='submit' className='input' />
    </div>
  )
}

export default SubmitButton
