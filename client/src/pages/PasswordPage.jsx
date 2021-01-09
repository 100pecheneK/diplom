import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import Form from '@components/Form'

export default function PasswordPage() {
  const history = useHistory()
  const auth = useAuth()
  // TODO: Придумать как это запихать в компонент формы
  const [error, setError] = useState('')

  const onSubmit = useCallback(
    async form => {
      const res = await auth.changePassword(form)
      if (res.ok) {
        history.replace('/protected')
      } else {
        setError(res.error)
      }
    },
    [auth, history]
  )

  return (
    <Form
      onSubmit={onSubmit}
      inputs={[
        {
          type: 'text',
          name: 'username',
          value: '',
          autoComplete: 'username',
          hidden: true,
        },
        {
          type: 'password',
          value: '',
          name: 'oldPassword',
          placeholder: 'Input current password',
          autoComplete: 'current-password',
          required: true,
        },
        {
          type: 'password',
          value: '',
          name: 'newPassword',
          placeholder: 'Input new password',
          autoComplete: 'new-password',
          required: true,
        },
      ]}
      submitButtonText={'Confirm'}
    >
      <p>{error}</p>
    </Form>
  )
}
