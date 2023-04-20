import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { addressState } from '@/store/walletState'
import { Web3Factory } from '@/web3'

export const WalletVM = () => {
  const [walletAddress, setWalletAddress] = useRecoilState(addressState)
  const [balance, setBalance] = useState('')
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const getBalance = async () => {
    const web3Factory = new Web3Factory()

    return web3Factory
      .getBalance(walletAddress)
      .then((balance) => {
        const b = Math.round(Number(balance) * Math.pow(10, 4)) / Math.pow(10, 4)
        return String(b)
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const handleCloseErrorAlert = () => {
    setErrorMessageForAlert('')
    setShowErrorAlert(false)
  }

  // == init ==
  useEffect(() => {
    if (walletAddress == '') return
    void getBalance()
      .then((b) => {
        setBalance(b)
      })
      .catch((e: Error) => {
        console.error(e.message)
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })
  }, [walletAddress])

  return {
    balance,
    errorMessageForAlert,
    showErrorAlert,
    handleCloseErrorAlert,
  }
}
