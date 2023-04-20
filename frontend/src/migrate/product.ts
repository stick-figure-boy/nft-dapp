import productContract from 'solidity/artifacts/contracts/Product.sol/Product.json'
import { Product as ProductContract } from 'solidity/types/web3-v1-contracts/Product'
import { AbiItem } from 'web3-utils'

import { Web3Factory } from '@/web3/index'

const address = process.env.REACT_APP_PRODUCT_CONTRACT_ADDRESS
const web3Factory = new Web3Factory()
const web3 = web3Factory.getWeb3()
const contract = () => {
  return new web3.eth.Contract(productContract.abi as AbiItem[], address) as unknown as ProductContract
}

export const createDummyProducts = () => {
  const fee = web3.utils.toWei('0.002', 'ether')

  web3.eth
    .getAccounts()
    .then((addresses) => {
      addresses.forEach((a, i) => {
        const product = {
          address: a,
          name: `product${i + 1}`,
          seller_id: i,
          image_url: 'https://placeimg.com/640/480/nature',
          description: `product${i + 1}product${i + 1}product${i + 1}product${i + 1}product${i + 1}product${
            i + 1
          }product${i + 1}`,
          price: 1,
        }
        contract()
          .methods.createProduct([
            product.seller_id,
            product.name,
            product.image_url,
            product.description,
            product.price,
          ])
          .send({ from: product.address, value: fee })
          .catch((e: Error) => {
            console.log(e.message)
          })
      })
    })
    .catch((e: Error) => {
      console.log(e.message)
    })

  console.log('finished create dummy products migrate.')
}
