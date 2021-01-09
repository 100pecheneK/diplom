import Form from '@components/Form'
import useAuth from '@hooks/useAuth'
import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

type TLocationState = {
  from: {
    pathname: string
  }
}

function LoginPage() {
  const history = useHistory()
  const location = useLocation<TLocationState>()
  const { from } = location.state || { from: { pathname: '/' } }
  const auth = useAuth()
  const [serverError, setServerError] = useState('')

  const onSubmit = useCallback(
    async form => {
      const res = await auth.signin(form)
      if (res.ok) {
        history.replace(from)
      } else {
        setServerError(res.error)
      }
    },
    [auth, from, history, setServerError]
  )

  return (
    <Form
      onSubmit={onSubmit}
      inputs={[
        {
          type: 'text',
          name: 'username',
          placeholder: 'Input username',
          autoComplete: 'username',
          required: true,
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Input password',
          autoComplete: 'current-password',
          required: true,
          minLength: 3,
        },
      ]}
      submitButtonText={'Log in'}
      serverError={serverError}
    />
  )
}

export default LoginPage
