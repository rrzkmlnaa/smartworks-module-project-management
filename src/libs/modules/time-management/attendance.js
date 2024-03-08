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

// Attendance request API
export const getAttendance = async (params, onlyData = false) => getApiData(endPoint.attendances, params, onlyData)

export const getMyAttendance = async (params, onlyData = false) => getApiData(endPoint.attendancesMe, params, onlyData)

export const getAttendanceReport = async (params, onlyData = false) =>
  getApiData(endPoint.attendancesResport, params, onlyData)

export const getAttendanceByMonth = async (params, onlyData = false) =>
  getApiData(endPoint.attendancesByMonth, params, onlyData)
