import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { BasicCard } from '@/components/card/BasicCard'
import { MainView } from '@/views/main/MainView'
import { WalletVM } from '@/views/main/wallet/WalletVM'

export const WalletView = () => {
  const VM = WalletVM()

  return (
    <MainView>
      <ErrorMessageAlert
        show={VM.showErrorAlert}
        message={VM.errorMessageForAlert}
        onClose={VM.handleCloseErrorAlert}
      />

      <div className="w-1/2 mx-auto">
        <BasicCard headerText="Balance">
          <div>{VM.balance} ETH</div>
        </BasicCard>
      </div>
    </MainView>
  )
}
