import { Button } from '@material-tailwind/react'

import { Props } from '@/components/button/index'

export const FilledButton = (props: Props) => {
  const { color, size, label, className, onClick } = props

  return (
    <Button variant="filled" size={size} color={color} className={className} onClick={onClick}>
      {label}
    </Button>
  )
}
