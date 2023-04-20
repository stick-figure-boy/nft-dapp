import { Avatar as Av } from '@material-tailwind/react'

interface Props {
  imageURL: string
}
export const Avatar = (props: Props) => {
  const { imageURL } = props
  return (
    <div className="flex gap-4">
      <Av src={imageURL} alt="avatar" variant="circular" />
    </div>
  )
}
