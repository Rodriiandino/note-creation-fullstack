import LinkBack from '../components/link-back'
import { useEffect, useState } from 'react'
import { error } from '../types/error-type'
import fetchApi from '../utils/fetch-api'
import SuccessError from '../components/success-error'
import Layout from '../components/layout'
import NoteDecor from '../components/notes/note-decor'

export default function ActivateAccount() {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [currentInput, setCurrentInput] = useState(0)
  const [error, setError] = useState<error>({
    message: '',
    status: 0,
    fieldErrors: []
  })
  const [success, setSuccess] = useState('')

  const revalidate = /^[0-9]*$/

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { maxLength, value } = event.target

    if (!revalidate.test(value)) {
      return
    }

    const index = parseInt(event.target.getAttribute('data-index')!)

    const nextIndex = index === 5 ? 5 : index + 1
    const nextInput = document.querySelector(
      `input[data-index="${nextIndex}"]`
    ) as HTMLInputElement

    setCode(prevCode => {
      const newCode = [...prevCode]
      newCode[index] = value

      if (value.length === maxLength && nextInput) {
        nextInput.disabled = false
        nextInput.focus()
        setCurrentInput(nextIndex)
      }
      return newCode
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      const index = parseInt(event.currentTarget.getAttribute('data-index')!)

      if (index === 5 && code[index].length === 1) {
        return
      }

      if (index > 0) {
        const prevIndex = index - 1
        const prevInput = document.querySelector(
          `input[data-index="${prevIndex}"]`
        ) as HTMLInputElement
        setCode(prevCode => {
          const newCode = [...prevCode]
          newCode[prevIndex] = ''

          if (prevInput) {
            prevInput.disabled = false
            prevInput.focus()
            setCurrentInput(prevIndex)
          }

          return newCode
        })
      }
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const paste = event.clipboardData.getData('text')
    const pasteArray = paste.split('')
    const sixDigitCode = pasteArray.slice(0, 6)

    if (!revalidate.test(sixDigitCode.join(''))) {
      return
    }

    const inputs =
      document.querySelectorAll<HTMLInputElement>('.activate__input')

    if (sixDigitCode.length === 6 && event.currentTarget === inputs[0]) {
      setCode(sixDigitCode)
      setCurrentInput(5)
    }
  }

  useEffect(() => {
    const firstInput =
      document.querySelector<HTMLInputElement>('.activate__input')
    if (firstInput) {
      firstInput.focus()
    }
  }, [])

  const handleCode = async () => {
    setError({ message: '', status: 0, fieldErrors: [] })
    setSuccess('')
    const codeString = code.join('')

    try {
      await fetchApi({
        path: '/auth/activate-account?token=' + codeString
      })
      setSuccess('Account activated')
    } catch (error: any) {
      setError(error)
    }
  }

  return (
    <Layout>
      <div className='account__activate'>
        <LinkBack path='/login' />
        <header>
          <h1>Activate Account</h1>
          <p>Check your email to activate your account.</p>
        </header>
        <div className='account__activate-code'>
          <input
            type='text'
            maxLength={1}
            className='activate__input'
            data-index={0}
            value={code[0]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            disabled={currentInput !== 0}
          />
          <input
            type='text'
            maxLength={1}
            className='activate__input'
            data-index={1}
            value={code[1]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={currentInput !== 1}
          />
          <input
            type='text'
            maxLength={1}
            className='activate__input'
            data-index={2}
            value={code[2]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={currentInput !== 2}
          />
          <span>-</span>
          <input
            type='text'
            maxLength={1}
            className='activate__input'
            data-index={3}
            value={code[3]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={currentInput !== 3}
          />
          <input
            type='text'
            maxLength={1}
            className='activate__input'
            data-index={4}
            value={code[4]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={currentInput !== 4}
          />
          <input
            type='text'
            maxLength={1}
            className='activate__input'
            data-index={5}
            value={code[5]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={currentInput !== 5}
          />
        </div>
        <footer>
          <button disabled={code.join('').length < 6} onClick={handleCode}>
            Activate
          </button>
        </footer>
        <SuccessError error={error} success={success} />
      </div>
      <NoteDecor
        content='Almost done!'
        color='pink-light'
        grado={-6}
        bottom={4}
        right={2}
      />
      <NoteDecor
        content='One more step'
        color='yellow'
        grado={-12}
        top={4}
        left={2}
      />
    </Layout>
  )
}
