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

// Overtime request API
export const getAllOvertimes = async (params, onlyData = false) => getApiData(endPoint.overtime, params, onlyData)

export const getMyOvertimes = async (params, onlyData = false) => getApiData(endPoint.myOvertime, params, onlyData)

export const getStaffOvertimes = async (params, onlyData = false) =>
  getApiData(endPoint.staffOvertime, params, onlyData)

export const requestOvertime = async (body, config = {}) => postApiData(endPoint.requestOvertime, body, config)

export const updateOvertime = async (id, body, config) => patchApiData(endPoint.overtime, id, body, config)
