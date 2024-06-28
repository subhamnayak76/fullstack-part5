import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = newToken => {
  return `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAll ,login,setToken}