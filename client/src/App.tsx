import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ProvideAuth } from '@contexts/AuthContext'
import PublicPage from '@pages/PublicPage'
import PrivateRoute from '@components/PrivateRoute'
import Navbar from '@components/Navbar'
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import ProtectedPage from '@pages/ProtectedPage'
import PasswordPage from '@pages/PasswordPage'

export default function AuthExample() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar />
        <div className='container mt-5'>
          <Switch>
            <Route path={['/', '/public']} exact>
              <PublicPage />
            </Route>
            <Route path='/login' exact>
              <LoginPage />
            </Route>
            <Route path='/register' exact>
              <RegisterPage />
            </Route>
            <PrivateRoute path='/protected' exact>
              <ProtectedPage />
            </PrivateRoute>
            <PrivateRoute path='/password' exact>
              <PasswordPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  )
}
