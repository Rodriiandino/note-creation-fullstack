type FetchApiParams = {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  authorization?: boolean
  headers?: Record<string, string>
}
const BASE_URL = 'http://localhost:8080/api/v1'

export default async function fetchApi({
  path,
  method = 'GET',
  body,
  authorization = true
}: FetchApiParams) {
  const url = `${BASE_URL}${path}`
  const token = localStorage.getItem('token')
  const authHeader =
    authorization && token ? { Authorization: `Bearer ${token}` } : ''

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    },
    body:
      method === 'GET' || method === 'DELETE' ? undefined : JSON.stringify(body)
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      throw error
    }

    if (response.status === 204) {
      return
    }

    return response.json()
  } catch (error) {
    throw error
  }
}
