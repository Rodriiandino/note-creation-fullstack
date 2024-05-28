import { error } from '../types/error-type'
import { useState, useEffect } from 'react'

export default function SuccessError({
  error,
  success
}: {
  error: error
  success: string
}) {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (error.status !== 0 || success) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }

    return () => {
      setShowMessage(false)
    }
  }, [error, success])

  return (
    <>
      {showMessage && (
        <div className={`account__${error.status !== 0 ? 'error' : 'success'}`}>
          {error.status !== 0 ? (
            error.message && error.fieldErrors ? (
              <div>
                <p>{error.message}</p>
                {error.fieldErrors.map((err, i) => (
                  <p key={i}>{err.message}</p>
                ))}
              </div>
            ) : error.message ? (
              <p>{error.message}</p>
            ) : (
              <p>Something went wrong</p>
            )
          ) : (
            success
          )}
        </div>
      )}
    </>
  )
}
