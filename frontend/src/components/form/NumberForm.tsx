import { Input } from '@material-tailwind/react'
import React from 'react'

interface Props {
  id: string
  label?: string
  val: number
  placeholder?: string
  errorMessage?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const NumberForm = (props: Props) => {
  const { id, label, val, placeholder, errorMessage, handleChange, handleBlur } = props

  return (
    <Input
      type="number"
      key={id}
      id={id}
      color="blue"
      label={label}
      value={val}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
