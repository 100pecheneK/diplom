import Alert from '@components/Alert'
import Input, { IInputProps } from '@components/Input'
import React from 'react'
import { useForm } from 'react-hook-form'

type TFormProps = {
  serverError?: string
  onSubmit: (form: object) => void
  inputs: IInputProps[]
  children?: React.ReactNode
  submitButtonText: string
}

export default function Form({
  serverError,
  onSubmit,
  inputs,
  children,
  submitButtonText,
}: TFormProps) {
  const { register, handleSubmit, errors } = useForm()

  return (
    <div className={'container flex md:mt-52 justify-center items-center'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'max-w-xs mx-auto p-6 bg-white rounded-lg shadow-xl'}
      >
        {inputs.map((input, i) => {
          const props = {
            ...input,
            className: 'mb-2',
          }
          return (
            <Input
              key={i}
              {...props}
              register={register}
              error={errors[props.name]}
            />
          )
        })}
        {children}
        <button
          type='submit'
          className='px-2 py-1 rounded bg-green-300 focus:outline-none focus:ring focus:ring-green-400 w-full'
        >
          {submitButtonText}
        </button>
        <Alert type={'error'} text={serverError} className='mt-3' />
      </form>
    </div>
  )
}
