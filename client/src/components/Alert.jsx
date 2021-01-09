import classNames from 'classnames'
import React from 'react'

export default function Alert({ type, text, className }) {
  if (!text) return null

  return (
    <div
      className={classNames(
        'px-4 py-3 rounded relative',
        type === 'error'
          ? 'bg-red-100 border border-red-400 text-red-700'
          : 'bg-green-100 border border-green-400 text-green-700',
        className
      )}
      role='alert'
    >
      <strong className='font-bold'>Alert!</strong>{' '}
      <span className='block sm:inline'>{text}</span>
    </div>
  )
}
