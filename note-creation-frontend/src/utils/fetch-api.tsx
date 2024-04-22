export default async function fetchApi({
  path,
  method = 'GET',
  body
}: {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}) {
  const url = 'http://localhost:8080/api' + path

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.errors[0].defaultMessage || error.getMessage)
    }
    return response.json()
  } catch (error) {
    console.error(error)
  }
}
