import { Alert } from '@/components/alert/Alert'

interface Props {
  show: boolean
  message: string
  onClose: () => void
}

export const SuccessMessageAlert = (props: Props) => {
  const { show, message, onClose } = props

  if (show) {
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return <Alert show={show} message={message} color="green" onClose={onClose} />
}
