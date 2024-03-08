import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        return Promise.reject(error)
      }

      if (status === 403) {
        handleTokenRefresh()
      }
    } else if (error.request) {
      console.error('Request error:', error.request)
    } else {
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

async function handleTokenRefresh() {
  try {
    const response = await axiosInstance.post('/auth/refresh')
    localStorage.setItem('accessToken', response.data.result)
  } catch (refreshError) {
    handleTokenRefreshError()
  }
}

function handleTokenRefreshError() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userData')
  window.location.href = '/login'
}

export default axiosInstance
