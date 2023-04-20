import { Alert as MAlert } from '@material-tailwind/react'
import { color as Color } from '@material-tailwind/react/types/components/alert'

interface Props {
  show: boolean
  message: string
  color: Color
  onClose: () => void
}

export const Alert = (props: Props) => {
  const { show, message, color, onClose } = props

  return (
    <MAlert
      show={show}
      className="absolute z-10"
      color={color}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      dismissible={{
        onClose: () => onClose(),
      }}
    >
      {message}
    </MAlert>
  )
}
