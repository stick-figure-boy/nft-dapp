import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { NavBar } from '@/components/navBar/NavBar'
import { MainVM } from '@/views/main/MainVM'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MainView = (props: Props) => {
  const { children } = props

  const VM = MainVM()

  return (
    <>
      <NavBar />
      <div className="m-4 relative">
        <ErrorMessageAlert
          show={VM.showErrorAlert}
          message={VM.errorMessageForAlert}
          onClose={VM.handleCloseErrorAlert}
        />
        {children}
      </div>
    </>
  )
}
