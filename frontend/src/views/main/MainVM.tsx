import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { UserABI } from '@/contracts/user/userABI'
import { accountState } from '@/store/userState'
import { addressState } from '@/store/walletState'
import { Web3Factory } from '@/web3/index'

export const MainVM = () => {
  const [walletAddress, setWalletAddress] = useRecoilState(addressState)
  const [, setAccount] = useRecoilState(accountState)
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const userABI = new UserABI(walletAddress)

  const getWalletAddress = () => {
    const web3Factory = new Web3Factory()
    return web3Factory
      .getAccount()
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const getMe = () => {
    return userABI
      .getMe()
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false)
  }

  // == init ==
  useEffect(() => {
    function init() {
      getWalletAddress()
        .then((res) => {
          setWalletAddress(res)

          void getMe()
            .then((res) => {
              setAccount(res)
            })
            .catch((e: Error) => {
              if (!e.message.includes('Account not found')) {
                setErrorMessageForAlert(e.message)
                setShowErrorAlert(true)
              }
            })
        })
        .catch((e: Error) => {
          console.error(e.message)
          setErrorMessageForAlert(e.message)
          setShowErrorAlert(true)
        })
    }
    void init()
  }, [])

  return {
    showErrorAlert,
    errorMessageForAlert,
    handleCloseErrorAlert,
  }
}
