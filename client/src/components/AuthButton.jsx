import useAuth from '@hooks/useAuth'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function AuthButton({ className }) {
  let history = useHistory()
  let auth = useAuth()

  return auth.loading ? (
    <p className={className}>Loading</p>
  ) : auth.user ? (
    <>
      <Link
        to='/protected'
        className={classNames(className, 'bg-green-300 hover:bg-green-400')}
      >
        Protected Page
      </Link>
      <button
        className={classNames(className, 'bg-red-200 hover:bg-red-300')}
        onClick={async () => {
          await auth.signout()
          history.push('/')
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to='/login'
        className={classNames(
          className,
          'bg-blue-400 text-white hover:bg-blue-500'
        )}
      >
        Login
      </Link>
      <Link
        to='/register'
        className={classNames(
          className,
          'bg-blue-400 text-white hover:bg-blue-500'
        )}
      >
        Register
      </Link>
    </>
  )
}

AuthButton.propTypes = {
  className: PropTypes.string,
}

export default AuthButton
