import React from 'react'
import { Link } from 'react-router-dom'
import AuthButton from '@components/AuthButton'
import classNames from 'classnames'

const navLinkClasses =
  'px-2 py-2 transition hover:shadow-inner focus:outline-none'

export default function Navbar() {
  return (
    <nav className='px-4 bg-green-200 shadow-lg'>
      <div className='xl:container flex justify-between items-center '>
        <Link to='/'>
          <h1 className='text-2xl font-bold'>Navbar</h1>
        </Link>
        <div className='flex'>
          <Link
            to='/public'
            className={classNames(
              navLinkClasses,
              'bg-green-300 hover:bg-green-400'
            )}
          >
            Public Page
          </Link>
          <AuthButton className={navLinkClasses} />
        </div>
      </div>
    </nav>
  )
}
