import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { ProductABI } from '@/contracts/product/productABI'
import { AccountResponse } from '@/contracts/user/types'
import { UserABI } from '@/contracts/user/userABI'
import { addressState } from '@/store/walletState'

// TODO
export type Product = {
  id: string
  name: string
  price: number
  image_url: string
}

export const CollectionVM = () => {
  const { userID } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const uID = userID!

  const [walletAddress, setWalletAddress] = useRecoilState(addressState)
  const [user, setUser] = useState({} as AccountResponse)
  const [products, setProducts] = useState([] as Product[])
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const userABI = new UserABI(walletAddress)
  const productABI = new ProductABI(walletAddress)

  const getProductsBySeller = () => {
    return productABI
      .getProductsBySeller(uID)
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const getAccount = () => {
    return userABI
      .getAccount(uID)
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

  // == init ==
  useEffect(() => {
    void getAccount()
      .then((res) => {
        setUser(res)
      })
      .catch((e: Error) => {
        console.error(e.message)
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })

    void getProductsBySeller()
      .then((res) => {
        setProducts(res)
      })
      .catch((e: Error) => {
        console.error(e.message)
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })
  }, [])

  return {
    user,
    products,
    errorMessageForAlert,
    showErrorAlert,
    handleCloseErrorAlert,
  }
}
