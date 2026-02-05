import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

const getStorageItem = (key) => {
  try {
    return localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStorageItem('token'))
  const [userRole, setUserRole] = useState(() => getStorageItem('userRole'))

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Error saving token:', error)
    }
  }, [token])

  useEffect(() => {
    try {
      if (userRole) {
        localStorage.setItem('userRole', userRole)
      } else {
        localStorage.removeItem('userRole')
      }
    } catch (error) {
      console.error('Error saving userRole:', error)
    }
  }, [userRole])

  const login = (newToken, role = 'user') => {
    setToken(newToken)
    setUserRole(role)
  }

  const logout = () => {
    setToken('')
    setUserRole('')
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  const isAuthenticated = () => {
    return !!token
  }

  const isAdmin = () => {
    return userRole === 'admin'
  }

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}
