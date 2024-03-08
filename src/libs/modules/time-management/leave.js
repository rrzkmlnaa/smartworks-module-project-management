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

// Leave Types request API
export const getLeaveType = async (params, onlyData = false) => getApiData(endPoint.leaveTypes, params, onlyData)

export const addLeaveType = async (body, config = {}) => postApiData(endPoint.leaveTypes, body, config)

export const updateLeaveType = async (id, body, config = {}) => patchApiData(endPoint.leaveTypes, id, body, config)

export const deleteLeaveType = async id => deleteApiData(endPoint.leaveTypes, id)

// Leave requests API
export const getLeave = async (params, onlyData = false) => getApiData(endPoint.leave, params, onlyData)

export const addLeave = async (body, config = {}) => postApiData(endPoint.leave, body, config)

export const updateLeave = async (id, body, config = {}) => patchApiData(endPoint.leave, id, body, config)
