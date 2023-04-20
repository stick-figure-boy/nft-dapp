import { DialogHeader } from '@material-tailwind/react'

import { BaseDialog } from '@/components/dialog/BaseDialog'

interface Props {
  show: boolean
  header: string
  children: JSX.Element | JSX.Element[]
  onClose: () => void
}

export const TitledDialog = (props: Props) => {
  const { show, header, children, onClose } = props

  return (
    <BaseDialog show={show} onClose={onClose}>
      <DialogHeader>{header}</DialogHeader>
      <>{children}</>
    </BaseDialog>
  )
}
