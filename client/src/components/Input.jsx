import React from 'react'
import classNames from 'classnames'
import Alert from '@components/Alert'

export default function Input({
  type,
  defaultValue,
  name,
  placeholder,
  autoComplete,
  className,
  register,
  required,
  minLength,
  error,
}) {
  const reg = {
    required: required && `Field ${name} is required`,
    minLength: {
      value: minLength,
      message: `Field ${name} must be at list ${minLength} characters or more`,
    },
  }
  return (
    <>
      <input
        type={type}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        ref={register(reg)}
        className={classNames(
          'px-3 py-2 border border-green-600 focus:outline-none focus:ring focus:ring-green-400 rounded w-full',
          className
        )}
      />
      {error && <Alert type='error' text={error.message} className='mb-3' />}
    </>
  )
}
