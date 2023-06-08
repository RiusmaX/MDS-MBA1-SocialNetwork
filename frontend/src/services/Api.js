import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: JSON.parse(window.localStorage.getItem('AUTH'))?.token ? `Bearer ${JSON.parse(window.localStorage.getItem('AUTH'))?.token}` : null
  },
  timeout: 10000
})

const getProfile = async (id) => {
  try {
    const response = await api.get(process.env.REACT_APP_BACKEND + `/api/users/${id}?populate=*`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const createMessage = async (body) => {
  try {
    const response = await api.post(process.env.REACT_APP_BACKEND + '/api/messages?populate=*', { ...body })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  getProfile,
  createMessage
}
