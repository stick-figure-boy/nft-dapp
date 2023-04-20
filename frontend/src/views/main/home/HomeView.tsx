import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { RecommendCarousel } from '@/views/main/home/components/RecommendCarousel'
import { UserRankingTable } from '@/views/main/home/components/UserRankingTable'
import { HomeVM } from '@/views/main/home/HomeVM'
import { MainView } from '@/views/main/MainView'

export const HomeView = () => {
  const VM = HomeVM()

  return (
    <MainView>
      <ErrorMessageAlert
        show={VM.showErrorAlert}
        message={VM.errorMessageForAlert}
        onClose={VM.handleCloseErrorAlert}
      />

      <div className="mb-16">
        <RecommendCarousel products={VM.recommendProducts} />
      </div>

      <div>
        <UserRankingTable rankings={VM.userRankings} onClick={VM.handleSelectUserRanking} />
      </div>
    </MainView>
  )
}
