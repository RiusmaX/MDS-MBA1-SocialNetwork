import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations'

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
    login({ variables: { identifier: credentials.email, password: credentials.password } })
  }

  return (
    <>
      <h2>LOGIN</h2>
      <form method='POST' noValidate style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <label for='email'>
          Email:
          <input type='email' name='email' onChange={handleChange} value={credentials.email} />
        </label>
        <label for='password'>
          Mot de passe:
          <input type='password' name='password' onChange={handleChange} value={credentials.password} />
        </label>
        {!loading && <input type='submit' />}
      </form>
      <pre>{JSON.stringify(data)}</pre>
    </>
  )
}

export default Auth
