import { ErrorMessage, Field } from 'formik'

const InputField = ({ type, handleChange, icon, placeholder, name }) => {
  const Icon = icon
  return (
    /**
     * @param {string} type - The type of the input
     * @param {function} handleChange - The function to handle the change of the input
     * @param {string} icon - The icon of the input
     * @param {string} placeholder - The placeholder of the input
     * @param {string} name - The name of the input
     * @returns {JSX.Element} - The input
     */
    <div className='input-container'>
      {icon && <Icon className='icon' color='white' />}
      <Field type={type} placeholder={placeholder} className='input' name={name} />
      <ErrorMessage name={name} />
    </div>
  )
}

export default InputField
