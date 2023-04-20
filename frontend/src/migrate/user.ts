import userContract from 'solidity/artifacts/contracts/User.sol/User.json'
import { User as TUser } from 'solidity/types/web3-v1-contracts/User'
import { AbiItem } from 'web3-utils'

import { Web3Factory } from '@/web3/index'

const address = process.env.REACT_APP_USER_CONTRACT_ADDRESS
const web3Factory = new Web3Factory()
const web3 = web3Factory.getWeb3()
const contract = () => {
  return new web3.eth.Contract(userContract.abi as AbiItem[], address) as unknown as TUser
}

export const createDummyAccounts = () => {
  const fee = web3.utils.toWei('0.002', 'ether')

  web3.eth
    .getAccounts()
    .then((addresses) => {
      addresses.forEach((a, i) => {
        const account = {
          address: a,
          name: `account${i + 1}`,
          bio: `account${i + 1}account${i + 1}account${i + 1}account${i + 1}account${i + 1}account${i + 1}account${
            i + 1
          }`,
          email: `account${i + 1}@example.com`,
          header_image_url: 'https://placeimg.com/640/480/nature',
          avatar_image_url: 'https://placeimg.com/640/480/people',
        }
        contract()
          .methods.createAccount([
            account.name,
            account.bio,
            account.email,
            account.header_image_url,
            account.avatar_image_url,
          ])
          .send({ from: account.address, value: fee })
          .catch((e: Error) => {
            console.log(e.message)
          })
      })
    })
    .catch((e: Error) => {
      console.log(e.message)
    })

  console.log('finished create dummy accounts migrate.')
}
