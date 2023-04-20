import { IconButton as IB } from '@material-tailwind/react'
import { size as Size, color as Color } from '@material-tailwind/react/types/components/button'

import { Icon, IconType } from '@/components/icon/Icon'

interface Props {
  color?: Color
  size?: Size
  type: IconType
  className?: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const RoundedIconButton = (props: Props) => {
  const { color, size, type, className, onClick } = props

  let c = 'rounded-full'
  if (typeof className != 'undefined') {
    c = `${c} ${className}`
  }

  return (
    <IB color={color} size={size} className={c} onClick={onClick}>
      <Icon type={type} />
    </IB>
  )
}
