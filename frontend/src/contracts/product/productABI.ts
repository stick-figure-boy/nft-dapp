import productContract from 'solidity/artifacts/contracts/Product.sol/Product.json'
import { Product as ProductContract } from 'solidity/types/web3-v1-contracts/Product'
import { AbiItem } from 'web3-utils'

import { CreateProductRequest, ProductResponse } from '@/contracts/product/types'
import { Web3Factory } from '@/web3/index'

let contractAddress = process.env.REACT_APP_PRODUCT_CONTRACT_ADDRESS
if (typeof contractAddress === 'undefined') {
  console.error('User contract address is undefined')
}
contractAddress = contractAddress as string

const web3Factory = new Web3Factory()
const web3 = web3Factory.getWeb3()

export class ProductABI {
  walletAddress: string
  contract: () => ProductContract

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress
    this.contract = () => {
      return new web3.eth.Contract(productContract.abi as AbiItem[], contractAddress) as unknown as ProductContract
    }
  }

  async getProducts(): Promise<ProductResponse[]> {
    return await this.contract()
      .methods.getProducts()
      .call({ from: this.walletAddress })
      .then((res) => {
        const products: ProductResponse[] = []
        res.forEach((r) => {
          const p: ProductResponse = {
            id: r[0],
            seller_id: r[1],
            name: r[2],
            image_url: r[3],
            description: r[4],
            price: Number(r[5]),
            timestamp: r[6],
          }
          products.push(p)
        })
        return products
      })
  }

  getProduct(id: string): Promise<ProductResponse> {
    return this.contract()
      .methods.getProduct(id)
      .call({ from: this.walletAddress })
      .then((p) => {
        const product: ProductResponse = {
          id: p[0],
          seller_id: p[1],
          name: p[2],
          image_url: p[3],
          description: p[4],
          price: Number(p[5]),
          timestamp: p[6],
        }
        return product
      })
      .catch((e: Error) => {
        throw e
      })
  }

  async getProductsBySeller(id: string): Promise<ProductResponse[]> {
    return await this.contract()
      .methods.getProductsBySeller(id)
      .call({ from: this.walletAddress })
      .then((res) => {
        const products: ProductResponse[] = []
        res.forEach((r) => {
          const p: ProductResponse = {
            id: r[0],
            seller_id: r[1],
            name: r[2],
            image_url: r[3],
            description: r[4],
            price: Number(r[5]),
            timestamp: r[6],
          }
          products.push(p)
        })
        return products
      })
  }

  async getRecommendProducts(): Promise<ProductResponse[]> {
    return await this.contract()
      .methods.getRecommendProducts()
      .call({ from: this.walletAddress })
      .then((res) => {
        const products: ProductResponse[] = []
        res.forEach((r) => {
          const p: ProductResponse = {
            id: r[0],
            seller_id: r[1],
            name: r[2],
            image_url: r[3],
            description: r[4],
            price: Number(r[5]),
            timestamp: r[6],
          }
          products.push(p)
        })
        return products
      })
  }

  createProduct(request: CreateProductRequest) {
    const fee = web3.utils.toWei('0.002', 'ether')

    return this.contract()
      .methods.createProduct([request.seller_id, request.name, request.image_url, request.description, request.price])
      .send({ from: this.walletAddress, value: fee })
      .catch((e: Error) => {
        throw e
      })
  }
}
