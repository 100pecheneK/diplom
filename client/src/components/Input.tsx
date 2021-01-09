import Alert from '@components/Alert'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'

export interface IInputProps {
  type: string
  name: string
  required?: boolean
  minLength?: number
  defaultValue?: string | number
  placeholder?: string
  autoComplete?: string
  className?: string
  hidden?: boolean
}
export interface IInputPropsUseForm extends IInputProps {
  register: ReturnType<typeof useForm>['register']
  error?: { message: string }
}

export default function Input({
  defaultValue,
  name,
  register,
  required,
  minLength,
  className,
  error,
  ...rest
}: IInputPropsUseForm) {
  const reg = {
    required: required ? `Field ${name} is required` : false,
    minLength: {
      value: minLength || 0,
      message: `Field ${name} must be at list ${minLength} characters or more`,
    },
  }
  return (
    <>
      <input
        name={name}
        ref={register(reg)}
        className={classNames(
          'px-3 py-2 border border-green-600 focus:outline-none focus:ring focus:ring-green-400 rounded w-full',
          className
        )}
        {...rest}
      />
      {error && <Alert type='error' text={error.message} className='mb-3' />}
    </>
  )
}
