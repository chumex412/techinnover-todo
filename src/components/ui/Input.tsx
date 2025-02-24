import {
  DeepMap,
  FieldError,
  FieldName,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { ReactNode } from 'react'
import clsx from 'clsx'

import { InputProps } from '@/domain/types/types-ui'

type ErrorProps = DeepMap<FieldValues, FieldError>

type ValidatePropTypes = UseFormRegisterReturn<FieldName<FieldValues>>

type InputPropsType = InputProps<ErrorProps, ValidatePropTypes, ReactNode>

const Input = ({
  label,
  name,
  multiline,
  className,
  placeholder,
  rows = 4,
  error,
  errors,
  validate,
  ...props
}: InputPropsType) => {
  let inputField = (
    <input
      type="text"
      placeholder={placeholder}
      className={clsx(
        'w-full rounded-xl border border-gray-100 px-2 py-2.5 text-base leading-[150%] text-gray-500 placeholder:text-gray-300 sm:px-3.5',
        className
      )}
      name={name}
      {...validate}
      {...props}
    />
  )

  if (multiline) {
    inputField = (
      <textarea
        className={clsx(
          'w-full resize-none rounded-xl border border-gray-100 px-2 py-2.5 text-base leading-[150%] text-gray-500 placeholder:text-gray-300 sm:px-3.5',
          className
        )}
        rows={rows}
        {...validate}
        {...props}
      />
    )
  }
  return (
    <section>
      <label className="mb-[6px] inline-block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div>{inputField}</div>
      {errors && errors[name] && (
        <small className="mt-2 inline-block origin-top text-xs text-red-400">
          {errors[name].message || error}
        </small>
      )}
    </section>
  )
}

export default Input
