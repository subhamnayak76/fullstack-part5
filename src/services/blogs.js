import axios from 'axios'
const baseUrl = '/api/blogs'
 let token = null
const setToken = newToken => {
   token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.get('api/user/myblogs', config)
    console.log('API response:', response)
    return response.data
  } catch (error) {
    console.error('Error in getAll:', error.response || error)
    throw error
  }
}



const login = async newObject => {
  const response = await axios.post('api/login', newObject)
  return response.data
}
const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll ,login,setToken,create,update,remove}