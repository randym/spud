import { useState, useEffect } from 'react'

export const useAuthentication = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const authenticate = async () => {
      const authentication = await fetch('/api/v1/auth/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          ContentType: 'application/json',
          Accept: 'application/json',
          AccessControlAllowCredentials: 'true',
        },
      })

      if (authentication.ok && authentication.status === 200) {
        const payload = await authentication.json()
        setUser(payload.user)
      }
    }

    authenticate()
  }, [])

  return { user }
}
