import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations'
import '../styles/Auth.scss'
import InputField from '../components/Global/Input/InputField'
import userIcon from '../assets/icons/user.svg'
import lockIcon from '../assets/icons/lock.svg'
import Julo from '../assets/images/Julo.png'

const Auth = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  const handleChange = (e) => {
    e.preventDefault()
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(credentials)
    login({ variables: { identifier: credentials.email, password: credentials.password } }).then(() => {
      console.log(error)
    }).catch(err => { console.log(err); console.log(error) })
  }

  return (

    <div className='authForm'>
      <img className='imgJulo' src={Julo} />
      <form method='POST' noValidate style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>

        <InputField type='text' handleChange={handleChange} placeholder='EMAIL' name='email' icon={userIcon} />
        <InputField type='password' handleChange={handleChange} placeholder='PASSWORD' name='password' icon={lockIcon} />
        {error && <div className='error'>bad credentials</div>}
        {!loading && <input type='submit' />}
      </form>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default Auth
