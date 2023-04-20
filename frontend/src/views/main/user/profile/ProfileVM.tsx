import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { CreateAccountRequest, UpdateAccountRequest } from '@/contracts/user/types'
import { UserABI } from '@/contracts/user/userABI'
import { accountState } from '@/store/userState'
import { addressState } from '@/store/walletState'

export const ProfileVM = () => {
  const [walletAddress, setWalletAddress] = useRecoilState(addressState)
  const [account] = useRecoilState(accountState)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [headerImageURL, setHeaderImageURL] = useState('')
  const [avatarImageURL, setAvatarImageURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessageForAlert, setSuccessMessageForAlert] = useState('')

  const userABI = new UserABI(walletAddress)

  const createAccount = () => {
    const req: CreateAccountRequest = {
      name,
      bio,
      email,
      header_image_url: headerImageURL,
      avatar_image_url: avatarImageURL,
    }
    return userABI.createAccount(req).catch((e: Error) => {
      throw e
    })
  }

  const updateAccount = () => {
    const userABI = new UserABI(walletAddress)

    const req: UpdateAccountRequest = {
      id: account.id,
      name,
      bio,
      email,
      header_image_url: headerImageURL,
      avatar_image_url: avatarImageURL,
    }
    return userABI.updateAccount(req).catch((e: Error) => {
      throw e
    })
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleChangeBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleHeaderImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderImageURL(event.target.value)
  }

  const handleChangeAvatarImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarImageURL(event.target.value)
  }

  const handleSave = () => {
    setErrorMessage('')
    if (account.id == '') {
      void createAccount()
        .then(() => {
          setShowSuccessAlert(true)
          setSuccessMessageForAlert('Created Account')
        })
        .catch((e: Error) => {
          setErrorMessage(e.message)
        })
    } else {
      void updateAccount()
        .then(() => {
          setShowSuccessAlert(true)
          setSuccessMessageForAlert('Updated Account')
        })
        .catch((e: Error) => {
          setErrorMessage(e.message)
        })
    }
  }

  const handleCloseErrorAlert = () => {
    setErrorMessageForAlert('')
    setShowErrorAlert(false)
  }

  const handleCloseSuccessAlert = () => {
    setSuccessMessageForAlert('')
    setShowSuccessAlert(false)
  }

  // == init ==
  useEffect(() => {
    if (account.id != '') {
      setName(account.name)
      setBio(account.bio)
      setEmail(account.email)
      setAvatarImageURL(account.avatar_image_url)
      setHeaderImageURL(account.header_image_url)
      return
    }

    setName(account.name)
    setBio(account.bio)
    setEmail(account.email)
    setAvatarImageURL(account.avatar_image_url)
    setHeaderImageURL(account.header_image_url)
  }, [account])

  return {
    account,
    name,
    bio,
    email,
    headerImageURL,
    avatarImageURL,
    errorMessage,
    showErrorAlert,
    errorMessageForAlert,
    showSuccessAlert,
    successMessageForAlert,
    handleChangeName,
    handleChangeBio,
    handleChangeEmail,
    handleHeaderImageURL,
    handleChangeAvatarImageURL,
    handleSave,
    handleCloseErrorAlert,
    handleCloseSuccessAlert,
  }
}
