// Import axios instance and API endpoint configuration
import axios from 'src/configs/axios'
import endPoint from 'src/configs/apiEndPoint'

const handleApiError = error => {
  console.error('API Request Error:', error)
  throw error
}

const sendApiRequest = async (method, resource, id, data, config = {}) => {
  try {
    const response = await axios[method](`${resource}/${id || ''}`, data, config)

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getApiData = async (resource, params, onlyData = false) => {
  try {
    const response = await axios.get(resource, { params })

    return onlyData ? response.data.result.data : response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const postApiData = async (resource, body, config) => sendApiRequest('post', resource, '', body, config)

export const patchApiData = async (resource, id, body, config) => sendApiRequest('patch', resource, id, body, config)

export const deleteApiData = async (resource, id) => sendApiRequest('delete', resource, id)

// Project requests API
export const addGoal = async (body, config = {}) => {
  if (Array.isArray(body)) {
    // If body is an array, loop through each item and insert
    const promises = body.map(item => postApiData(endPoint.goals, item, config))

    return Promise.all(promises)
  } else {
    // If body is not an array, insert the single object
    return postApiData(endPoint.goals, body, config)
  }
}

export const getGoals = async (params, onlyData = false) => getApiData(endPoint.goals, params, onlyData)
