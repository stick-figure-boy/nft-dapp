import { Alert } from '@/components/alert/Alert'

interface Props {
  show: boolean
  message: string
  onClose: () => void
}

export const ErrorMessageAlert = (props: Props) => {
  const { show, message, onClose } = props

  return <Alert show={show} message={message} color="red" onClose={onClose} />
}
