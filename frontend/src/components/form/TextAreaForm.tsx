import { Textarea } from '@material-tailwind/react'
import React from 'react'

interface Props {
  id: string
  label?: string
  val: string
  rows?: number
  placeholder?: string
  errorMessage?: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleBlur?: React.FocusEventHandler<HTMLTextAreaElement>
}

export const TextAreaForm = (props: Props) => {
  const { id, label, val, rows, placeholder, errorMessage, handleChange, handleBlur } = props

  let r = 4
  if (rows != undefined) {
    r = rows
  }

  return (
    <Textarea
      key={id}
      id={id}
      placeholder={placeholder}
      value={val}
      rows={rows}
      label={label}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
