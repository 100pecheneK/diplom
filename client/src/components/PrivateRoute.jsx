import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useAuth from 'src/hooks/useAuth'

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
