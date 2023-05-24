
const SwitchButtonTheme = (props) => {
  /**
     * @param {string} label - The label of the button
     * @returns {JSX.Element} - The button
     */
  return (
    <div className='container'>
      <div class='switch'>
        <input type='checkbox' name='toggle' onClick={props.handleOnClick} />
        <label for='toggle'>
          <i class='bulb'>
            <span class='bulb-center' />
            <span class='filament-1' />
            <span class='filament-2' />
            <span class='reflections'>
              <span />
            </span>
            <span class='sparks'>
              <i class='spark1' />
              <i class='spark2' />
              <i class='spark3' />
              <i class='spark4' />
            </span>
          </i>
        </label>
      </div>
    </div>
  )
}

export default SwitchButtonTheme
