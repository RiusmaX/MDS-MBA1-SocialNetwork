
const SwitchButtonTheme = (props) => {
  /**
     * @param {string} label - The label of the button
     * @returns {JSX.Element} - The button
     */
  return (
    <div className='containerTheme'>
      <div className='switch'>
        <input type='checkbox' name='toggle' onClick={props.handleOnClick} />
        <label for='toggle'>
          <i className='bulb'>
            <span className='bulb-center' />
            <span className='filament-1' />
            <span className='filament-2' />
            <span className='reflections'>
              <span />
            </span>
            <span className='sparks'>
              <i className='spark1' />
              <i className='spark2' />
              <i className='spark3' />
              <i className='spark4' />
            </span>
          </i>
        </label>
      </div>
    </div>
  )
}

export default SwitchButtonTheme
