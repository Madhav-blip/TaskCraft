import { createContext, useContext, useState } from 'react'
import { setToken } from '@/lib/api'

// keeps the logged in user in memory. gets lost on refresh but thats how
// in-memory jwt works, user just logs in again
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null)
  const [user, setUser] = useState(null)

  function signIn(data) {
    setToken(data.token) // give the token to api.js
    setTokenState(data.token)
    setUser(data.user)
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: token ? true : false, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
