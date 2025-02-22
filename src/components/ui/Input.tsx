import {
  DeepMap,
  FieldError,
  FieldName,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form'
import clsx from 'clsx'

import { InputProps } from '@/domain/types/types-ui'
import { ReactNode } from 'react'

type ErrorProps = DeepMap<FieldValues, FieldError>

type ValidatePropTypes = UseFormRegisterReturn<FieldName<FieldValues>>

type InputPropsType = InputProps<ErrorProps, ValidatePropTypes, ReactNode>

const Input = ({
  label,
  name,
  multiline,
  className,
  placeholder,
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
        'w-full rounded-xl border border-gray-100 px-3.5 py-3 text-base leading-[150%] text-gray-500 placeholder:text-gray-300',
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
          'w-full resize-none rounded-xl border border-gray-100 px-3.5 py-3 text-base leading-[150%] text-gray-500 placeholder:text-gray-300',
          className
        )}
        {...validate}
        {...props}
      />
    )
  }
  return (
    <section>
      <label className="mb-[6px] text-sm font-medium text-gray-700">
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
