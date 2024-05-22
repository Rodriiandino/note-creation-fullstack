import { error } from '../types/error-type'

export default function SuccessError({
  error,
  success
}: {
  error: error
  success: string
}) {
  return (
    <>
      {error.status !== 0 && (
        <div className='account__error'>
          {error?.fieldErrors?.length > 0
            ? error.fieldErrors.map((fieldError, index) => (
                <div key={index}>{fieldError.message}</div>
              ))
            : error.message}
        </div>
      )}
      {success && <div className='account__success'>{success}</div>}
    </>
  )
}
