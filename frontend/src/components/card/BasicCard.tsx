import { Card, CardBody } from '@material-tailwind/react'

interface Props {
  children: JSX.Element | JSX.Element[]
  headerText?: string
}

export const BasicCard = (props: Props) => {
  const { children, headerText } = props

  return (
    <Card>
      <div className="cursor-pointer relative group">
        <CardBody>
          {(() => {
            if (headerText != '') return <h2 className="font-bold text-2xl">{headerText}</h2>
          })()}

          {children}
        </CardBody>
      </div>
    </Card>
  )
}
