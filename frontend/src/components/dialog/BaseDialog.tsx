import { Dialog } from '@material-tailwind/react'

interface Props {
  show: boolean
  children: JSX.Element | JSX.Element[]
  onClose: () => void
}

export const BaseDialog = (props: Props) => {
  const { show, children, onClose } = props

  return (
    <Dialog
      open={show}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler={() => {}}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      {children}
    </Dialog>
  )
}
