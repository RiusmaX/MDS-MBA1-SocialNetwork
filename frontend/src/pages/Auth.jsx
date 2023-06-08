import { useEffect } from 'react'
import '../styles/Auth.scss'
import '../styles/Global.scss'
import InputField from '../components/Global/Input/InputField'
import { FaUser, FaLock } from 'react-icons/fa'
import Julo from '../assets/images/Julo.png'
import juloError from '../assets/images/Julo_error.png'
import SubmitButton from '../components/Global/Buttons/SubmitButton'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Auth = () => {
  const validationSchema = Yup.object().shape({
    identifier: Yup.string().email('invalid email adress').required('email is required'),
    password: Yup.string().min(5, 'password must contains 5 characters').required('password is required')
  })
  const { login, state: { isLoggedIn, error } } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  const handleSubmit = (values) => {
    login(values)
  }

  return (
    <>
      <div className='authForm'>
        <img src={error ? juloError : Julo} alt='julo' className='imgJulo' />
        <Formik
          initialValues={{
            identifier: 'toto@tata.fr',
            password: 'secret'
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form onSubmit={props.handleSubmit}>
              <InputField
                type='email'
                placeholder='EMAIL'
                name='identifier'
                icon={FaUser}
              />
              <InputField
                type='password'
                placeholder='PASSWORD'
                name='password'
                icon={FaLock}
              />
              {error && <p className='error'>{error.message}</p>}
              <SubmitButton label='Connexion' />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Auth
