import '../styles/Auth.scss'
import '../styles/Global.scss'
import InputField from '../components/Global/Input/InputField'
import { FaUser, FaLock, FaMailBulk } from 'react-icons/fa'
import Julo from '../assets/images/Julo.png'
import juloError from '../assets/images/Julo_error.png'
import SubmitButton from '../components/Global/Buttons/SubmitButton'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().email('invalid email adress').required('email is required'),
    password: Yup.string().min(5, 'password must contains 5 characters').required('password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match').required('confirm password is required')
  })
  const { register, state: { error } } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    register(values)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <>
      <div className='authForm'>
        <img src={error ? juloError : Julo} alt='julo' className='imgJulo' />
        <h1>Register</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form onSubmit={props.handleSubmit}>
              <InputField
                type='text'
                placeholder='USERNAME'
                name='username'
                icon={FaUser}
              />
              <InputField
                type='email'
                placeholder='EMAIL'
                name='email'
                icon={FaMailBulk}
              />
              <InputField
                type='password'
                placeholder='PASSWORD'
                name='password'
                icon={FaLock}
              />
              <InputField
                type='password'
                placeholder='CONFIRM PASSWORD'
                name='confirmPassword'
                icon={FaLock}
              />
              {error && <p className='error'>{error.message}</p>}
              <SubmitButton label='Inscription' />
              <p onClick={() => navigate('/auth')} className='cursor-pointer'>Je suis deja inscrit</p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Register
