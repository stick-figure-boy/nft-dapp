import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { ProductABI } from '@/contracts/product/productABI'
import { CreateProductRequest } from '@/contracts/product/types'
import { UserABI } from '@/contracts/user/userABI'
import { accountState } from '@/store/userState'
import { addressState } from '@/store/walletState'

export const ProductCreateVM = () => {
  const navigate = useNavigate()

  const [walletAddress] = useRecoilState(addressState)
  const [account] = useRecoilState(accountState)
  const [newProductName, setNewProductName] = useState('')
  const [newProductImageURL, setNewProductImageURL] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setNewProductPrice] = useState(0)
  const [newProductErrorMessage, setNewProductErrorMessage] = useState('')
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessageForAlert, setSuccessMessageForAlert] = useState('')

  const userABI = new UserABI(walletAddress)
  const productABI = new ProductABI(walletAddress)

  const createProduct = () => {
    const req: CreateProductRequest = {
      seller_id: account.id,
      name: newProductName,
      image_url: newProductImageURL,
      description: newProductDescription,
      price: newProductPrice,
    }
    return productABI.createProduct(req).catch((e: Error) => {
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

  const handleChangeNewProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductName(event.target.value)
  }

  const handleChangeNewProductImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductImageURL(event.target.value)
  }

  const handleChangeNewProductDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProductDescription(event.target.value)
  }

  const handleChangeNewProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductPrice(Number(event.target.value))
  }

  const handleCreateNewProduct = () => {
    setNewProductErrorMessage('')
    void createProduct()
      .then(() => {
        setShowSuccessAlert(true)
        setSuccessMessageForAlert('Created Product')
        setNewProductName('')
        setNewProductImageURL('')
        setNewProductDescription('')
        setNewProductPrice(0)
      })
      .catch((e: Error) => {
        setNewProductErrorMessage(e.message)
      })
  }

  const handleCloseErrorAlert = () => {
    setErrorMessageForAlert('')
    setShowErrorAlert(false)
  }

  const handleCloseSuccessAlert = () => {
    setSuccessMessageForAlert('')
    setShowSuccessAlert(false)
  }

  return {
    newProductName,
    newProductImageURL,
    newProductDescription,
    newProductPrice,
    newProductErrorMessage,
    errorMessageForAlert,
    showErrorAlert,
    showSuccessAlert,
    successMessageForAlert,
    handleChangeNewProductName,
    handleChangeNewProductImageURL,
    handleChangeNewProductDescription,
    handleChangeNewProductPrice,
    handleCreateNewProduct,
    handleCloseErrorAlert,
    handleCloseSuccessAlert,
  }
}
