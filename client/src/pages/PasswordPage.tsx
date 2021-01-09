import Form from '@components/Form'
import useAuth from '@hooks/useAuth'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function PasswordPage() {
  const history = useHistory()
  const auth = useAuth()
  const [serverError, setServerError] = useState('')

  const onSubmit = useCallback(
    async form => {
      const res = await auth.changePassword(form)
      if (res.ok) {
        history.replace('/protected')
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
          autoComplete: 'username',
          hidden: true,
        },
        {
          type: 'password',
          name: 'oldPassword',
          placeholder: 'Input current password',
          autoComplete: 'current-password',
          required: true,
        },
        {
          type: 'password',
          name: 'newPassword',
          placeholder: 'Input new password',
          autoComplete: 'new-password',
          required: true,
        },
      ]}
      submitButtonText={'Confirm'}
      serverError={serverError}
    />
  )
}
