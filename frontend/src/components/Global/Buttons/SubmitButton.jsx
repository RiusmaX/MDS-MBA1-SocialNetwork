const SubmitButton = ({ label, disabled }) => {
  /**
   * @param {string} label - The label of the button
   * @returns {JSX.Element} - The button
   */
  return (
    <div className='input-container'>
      <input type='submit' className='input' value={label || ''} disabled={disabled} />
    </div>
  )
}

export default SubmitButton
