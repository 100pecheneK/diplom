import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import Form from '@components/Form'

function RegisterPage() {
  const history = useHistory()
  const auth = useAuth()
  const [serverError, setServerError] = useState('')

  const onSubmit = useCallback(
    async form => {
      const res = await auth.register(form)
      if (res.ok) {
        history.replace('/')
      } else {
        setServerError(res.error)
      }
    },
    [auth, history, setServerError]
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
          type: 'text',
          name: 'phone',
          placeholder: 'Input phone',
          autoComplete: 'phone',
          required: true,
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Input password',
          autoComplete: 'new-password',
          required: true,
          minLength: 3,
        },
      ]}
      submitButtonText={'Register'}
      serverError={serverError}
    />
  )
}

export default RegisterPage
