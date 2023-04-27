const InputField = ({ type, handleChange, icon, placeholder, name, value }) => {
  return (
    /*
    * This code is a functional component that renders an input field.
    * The component takes 4 props: icon, type, placeholder, and name.
    * The component also takes a function as a prop: handleChange.
    * This function is used to handle the input field's onChange event.
    * The component returns a div with a class of input-container.
    * The div contains an img tag if the icon prop is true.
    * The div contains an input tag with a type of either text or password.
    * The value of the input tag is set to the value prop.
    * The onChange event of the input tag is set to the handleChange function.
    *
    * The code also returns an empty HTML element. The empty element is used to make sure that the code is valid JSX.
    * The empty element is not rendered to the DOM.
    */
    <div className='input-container'>
      {icon && <img src={icon} alt='icon' className='icon' />}
      <input type={type} placeholder={placeholder} className='input' name={name} onChange={handleChange} value={value} />
    </div>
  )
}

export default InputField
