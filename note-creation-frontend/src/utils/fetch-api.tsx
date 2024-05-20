export default async function fetchApi({
  path,
  method = 'GET',
  body,
  credentials = 'include'
}: {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  credentials?: RequestCredentials
}) {
  const url = 'http://localhost:8080/api/v1' + path

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify(body)
  }

  if (method === 'GET' || method === 'DELETE') {
    delete (options as { body?: any }).body
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
