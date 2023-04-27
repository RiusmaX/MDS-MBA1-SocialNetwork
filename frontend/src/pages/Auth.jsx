import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { useState } from 'react'
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations'
import { GET_USER_BY_EMAIL } from '../graphql/queries/usersQueries'
import '../styles/Auth.scss'
import InputField from '../components/Global/Input/InputField'
import userIcon from '../assets/icons/user.svg'
import lockIcon from '../assets/icons/lock.svg'
import Julo from '../assets/images/Julo.png'
import Julo_error from '../assets/images/Julo_error.png'
import SubmitButton from '../components/Global/Buttons/SubmitButton'

const Auth = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const  [errorLabel, setErrorLabel] = useState('')

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL(credentials.email))

  const handleChange = (e) => {
    e.preventDefault()
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { identifier: credentials.email, password: credentials.password } }).then(() => {
      console.log(error)
    }).catch(err => {
      console.log(err)
      console.log(error)
      getUserByEmail({ variables: { email: credentials.email } }).then((d) => {
        if(d.data.usersPermissionsUsers.data.length > 0){
          setErrorLabel('wrong password')
        }
        else{
          setErrorLabel('Email doesnt exist')
        }
      }).catch(err => {
        console.log(err)
      })
    })
  }

  return (
    <div className='authForm'>
      <img className='imgJulo' src={error ? Julo_error : Julo} alt='Jules img' />
      <form method='POST' noValidate style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>

        <InputField type='text' handleChange={handleChange} placeholder='EMAIL' name='email' icon={userIcon} />
        <InputField type='password' handleChange={handleChange} placeholder='PASSWORD' name='password' icon={lockIcon} />
        {error && errorLabel && <div className='error'>{errorLabel}</div>}
        {!loading && <SubmitButton label='Connexion' />}
      </form>
    </div>
  )
}

export default Auth
