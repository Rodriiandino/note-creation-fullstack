function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Invalid token:', e)
    return null
  }
}

export function isTokenExpired(token: string) {
  const decoded = parseJwt(token)
  if (!decoded || !decoded.exp) {
    return true
  }
  const now = Date.now() / 1000
  return decoded.exp < now
}

export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}
