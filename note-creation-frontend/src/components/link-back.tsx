import { Link } from 'react-router-dom'

export default function LinkBack({ path }: { path: string }) {
  return (
    <Link className='account__back' to={path}>
      <svg
        fill='none'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='currentColor'
        width='20'
        height='20'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
        />
      </svg>
    </Link>
  )
}
