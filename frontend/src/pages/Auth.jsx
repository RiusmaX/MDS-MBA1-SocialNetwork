import { useState, useContext, useEffect } from 'react'
import '../styles/Auth.scss'
import '../styles/Global.scss'
import InputField from '../components/Global/Input/InputField'
import { FaUser, FaLock } from 'react-icons/fa'
import Julo from '../assets/images/Julo.png'
import SubmitButton from '../components/Global/Buttons/SubmitButton'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('invalid email adress').required('email is required'),
    password: Yup.string().min(5, 'password must contains 5 characters').required('password is required')
  })
  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const [errorLabel, setErrorLabel] = useState('')

  const handleSubmit = (values) => {
    authContext.login(values)
  }

  useEffect(() => {
    if (authContext.isLoggedIn()) {
      navigate('/')
    }
  })

  return (
    <div className='authForm'>
      <img className='imgJulo' src={Julo} alt='Jules img' />
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField
            type='email'
            placeholder='EMAIL'
            name='email'
            icon={FaUser}
          />
          <InputField
            type='password'
            placeholder='PASSWORD'
            name='password'
            icon={FaLock}
          />
          {errorLabel && <div className='error'>{errorLabel}</div>}
          <SubmitButton label='Connexion' />
        </Form>
      </Formik>
    </div>
  )
}

export default Auth
