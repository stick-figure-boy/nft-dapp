import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { SuccessMessageAlert } from '@/components/alert/success/SuccessMessageAlert'
import { FilledButton } from '@/components/button/FilledButton'
import { BasicCard } from '@/components/card/BasicCard'
import { EmailForm } from '@/components/form/EmailForm'
import { TextAreaForm } from '@/components/form/TextAreaForm'
import { TextForm } from '@/components/form/TextForm'
import { MainView } from '@/views/main/MainView'
import { ProfileVM } from '@/views/main/user/profile/ProfileVM'

export const ProfileView = () => {
  const VM = ProfileVM()

  return (
    <MainView>
      <ErrorMessageAlert
        show={VM.showErrorAlert}
        message={VM.errorMessageForAlert}
        onClose={VM.handleCloseErrorAlert}
      />
      <SuccessMessageAlert
        show={VM.showSuccessAlert}
        message={VM.successMessageForAlert}
        onClose={VM.handleCloseSuccessAlert}
      />

      <div className="w-1/2 mx-auto">
        <BasicCard headerText="Profile">
          <div className="mb-3 text-red-500">{VM.errorMessage}</div>
          <div className="mb-3">
            <TextForm id="account_name" label="Name" val={VM.name} handleChange={VM.handleChangeName} />
          </div>
          <div className="mb-3">
            <TextAreaForm id="account_bio" label="Bio" val={VM.bio} handleChange={VM.handleChangeBio} />
          </div>
          <div className="mb-3">
            <EmailForm id="account_email" label="Email" val={VM.email} handleChange={VM.handleChangeEmail} />
          </div>
          <div className="mb-3">
            <TextForm
              id="account_header"
              label="Header Image URL"
              val={VM.headerImageURL}
              handleChange={VM.handleHeaderImageURL}
            />
          </div>
          <div className="mb-3">
            <TextForm
              id="account_avatar"
              label="Avatar Image URL"
              val={VM.avatarImageURL}
              handleChange={VM.handleChangeAvatarImageURL}
            />
          </div>

          <div className="flex justify-center">
            <FilledButton label="Save" onClick={VM.handleSave} />
          </div>
        </BasicCard>
      </div>
    </MainView>
  )
}
