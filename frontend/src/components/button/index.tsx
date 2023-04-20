import { size as Size, color as Color } from '@material-tailwind/react/types/components/button'

import { themeSize } from '@/tailwind/theme'

const COLOR = {
  blue: 'blue',
  green: 'green',
  red: 'red',
  yellow: 'amber',
} as const

const SIZE = {
  sm: themeSize.sm,
  md: themeSize.md,
  lg: themeSize.lg,
} as const

export const buttonStyle = {
  color: COLOR,
  size: SIZE,
}

export interface Props {
  color?: Color
  size?: Size
  label: string
  className?: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}
