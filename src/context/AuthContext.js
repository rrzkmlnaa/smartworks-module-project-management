// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.result, role: 'admin' })
          })
          .catch(async error => {
            await axios
              .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`)
              .then(response => {
                if (response.status == 204) {
                  handleLogout()

                  return
                }

                localStorage.setItem('accessToken', response.data.result)

                // Set loading to false after successfully refreshing token
                setLoading(false)
              })
              .catch(refreshError => {
                handleLogout()

                // Set loading to false after failed token refresh
                setLoading(false)

                // Redirect to login page upon failed token refresh
                router.push('/login')
              })
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.result.accessToken)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.result.user, role: 'master admin' })
        window.localStorage.setItem('userData', JSON.stringify({ ...response.data.result.user, role: 'master admin' }))
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        await axios
          .get(authConfig.userPermissions, {
            headers: {
              Authorization: `Bearer ${response.data.result.accessToken}`
            }
          })
          .then(async response => {
            window.localStorage.setItem('userPermissions', JSON.stringify(response.data.result.A))
          })

        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('userPermissions')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem('sharedData')
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
