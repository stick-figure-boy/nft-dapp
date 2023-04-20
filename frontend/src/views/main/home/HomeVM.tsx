import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { ProductABI } from '@/contracts/product/productABI'
import { ProductResponse } from '@/contracts/product/types'
import { UserRanking } from '@/contracts/user/types'
import { UserABI } from '@/contracts/user/userABI'
import { ROUTE } from '@/RouteConfig'
import { addressState } from '@/store/walletState'

export const HomeVM = () => {
  const navigate = useNavigate()

  const [walletAddress, setWalletAddress] = useRecoilState(addressState)
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [recommendProducts, setRecommendProducts] = useState([] as ProductResponse[])
  const [userRankings, setUserRankings] = useState([] as UserRanking[])

  const userABI = new UserABI(walletAddress)
  const productABI = new ProductABI(walletAddress)

  const getRecommendProducts = () => {
    return productABI
      .getRecommendProducts()
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const getUserRankings = () => {
    return userABI
      .getUserRankings()
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const handleCloseErrorAlert = () => {
    setErrorMessageForAlert('')
    setShowErrorAlert(false)
  }

  const handleSelectUserRanking = (id: string) => {
    navigate(`${ROUTE.collection}/${id}`)
  }

  // == init ==
  useEffect(() => {
    if (walletAddress == '') return
    void getRecommendProducts()
      .then((res) => {
        setRecommendProducts(res)
      })
      .catch((e: Error) => {
        console.error(e.message)
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })

    void getUserRankings()
      .then((res) => {
        setUserRankings(res)
      })
      .catch((e: Error) => {
        console.error(e.message)
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })
  }, [walletAddress])

  return {
    errorMessageForAlert,
    recommendProducts,
    showErrorAlert,
    userRankings,
    handleCloseErrorAlert,
    handleSelectUserRanking,
  }
}
