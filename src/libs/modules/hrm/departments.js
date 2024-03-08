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

// Departments Request API
export const getDepartment = async (params, onlyData = false) => getApiData(endPoint.department, params, onlyData)

export const addDepartment = async (body, config) => postApiData(endPoint.department, body, config)

export const assignDepartment = async (body, config) => postApiData(endPoint.assignDepartment, body, config)

export const updateDepartment = async (id, body, config) => patchApiData(endPoint.department, id, body, config)

export const deleteDepartment = async id => deleteApiData(endPoint.department, id)
