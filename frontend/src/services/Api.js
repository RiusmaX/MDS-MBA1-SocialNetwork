import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 10000
})

const getProfile = async (id) => {
  try {
    const response = await api.get(`/users/${id}?populate=*`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  getProfile
}
