import { Button } from '@material-tailwind/react'

import { Props } from '@/components/button/index'

export const OutlinedButton = (props: Props) => {
  const { color, size, label, onClick } = props

  return (
    <Button variant="outlined" size={size} color={color} onClick={onClick}>
      {label}
    </Button>
  )
}
