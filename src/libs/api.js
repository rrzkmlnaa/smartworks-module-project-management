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

export const getUserPermissions = async (params, onlyData = false) =>
  getApiData(endPoint.userPermissions, params, onlyData)

export const getAllRoles = async (params, onlyData = false) => getApiData(endPoint.roles, params, onlyData)

export const fetchRoleDetail = async (id, params, onlyData = false) =>
  getApiData(`${endPoint.roles}/${id}`, params, onlyData)

export const fetchDetailRole = async (params, onlyData = false) => getApiData(endPoint.roles, params, onlyData)

export const getAllPermissions = async (params, onlyData = false) => getApiData(endPoint.permissions, params, onlyData)

export const updateRolePermission = async (id, body, config) => patchApiData(endPoint.roles, id, body, config)

export const addRolePermission = async (body, config) => postApiData(endPoint.roles, body, config)
