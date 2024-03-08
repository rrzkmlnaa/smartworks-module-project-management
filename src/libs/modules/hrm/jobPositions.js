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

// Request API
export const getJobPosition = async (params, onlyData = false) => getApiData(endPoint.jobPosition, params, onlyData)

export const addJobPosition = async (body, config) => postApiData(endPoint.jobPosition, body, config)

export const assignJobPosition = async (body, config) => postApiData(endPoint.assignJobPosition, body, config)

export const updateJobPosition = async (id, body, config) => patchApiData(endPoint.jobPosition, id, body, config)

export const deleteJobPosition = async id => deleteApiData(endPoint.jobPosition, id)
