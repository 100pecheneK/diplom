import React from 'react'
import useAuth from '@hooks/useAuth'
import { Link } from 'react-router-dom'

function ProtectedPage() {
  let auth = useAuth()
  return (
    <>
      <h3>Protected</h3>
      <div className='shadow-lg border rounded px-3 py-2'>
        <p>
          username: <b>{auth.user.username}</b>
        </p>
        <p>
          phone: <b>{auth.user.phone}</b>
        </p>
        <Link to='/password' className='underline text-red-600 hover:text-red-800'>
          Change Password
        </Link>
        <hr className='my-2' />
        <p className='break-all py-2 px-3 bg-red-200'>
          refreshToken: <b>{auth.user.refreshToken}</b>
        </p>
        <p className='break-all py-2 px-3 bg-green-200'>
          accessToken: <b>{auth.user.accessToken}</b>
        </p>
      </div>
    </>
  )
}

export default ProtectedPage
