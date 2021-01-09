import useAuth from '@hooks/useAuth'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return auth.loading ? (
    <h1>Loading</h1>
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
export default PrivateRoute
