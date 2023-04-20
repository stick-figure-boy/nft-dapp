import userContract from 'solidity/artifacts/contracts/User.sol/User.json'
import { User as UserContract } from 'solidity/types/web3-v1-contracts/User'
import { AbiItem } from 'web3-utils'

import {
  CreateAccountRequest,
  UserRanking,
  AccountResponse,
  MeResponse,
  UpdateAccountRequest,
} from '@/contracts/user/types'
import { Web3Factory } from '@/web3/index'

let contractAddress = process.env.REACT_APP_USER_CONTRACT_ADDRESS
if (typeof contractAddress === 'undefined') {
  console.error('User contract address is undefined')
}
contractAddress = contractAddress as string

const web3Factory = new Web3Factory()
const web3 = web3Factory.getWeb3()

export class UserABI {
  walletAddress: string
  contract: () => UserContract

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress
    this.contract = () => {
      return new web3.eth.Contract(userContract.abi as AbiItem[], contractAddress) as unknown as UserContract
    }
  }

  async createAccount(req: CreateAccountRequest) {
    const fee = web3.utils.toWei('0.002', 'ether')

    return this.contract()
      .methods.createAccount([req.name, req.bio, req.email, req.header_image_url, req.avatar_image_url])
      .send({ from: this.walletAddress, value: fee })
      .catch((e: Error) => {
        throw e
      })
  }

  updateAccount(req: UpdateAccountRequest) {
    return this.contract()
      .methods.updateAccount([req.id, req.name, req.bio, req.email, req.header_image_url, req.avatar_image_url])
      .send({ from: this.walletAddress })
      .catch((e: Error) => {
        throw e
      })
  }

  getMe(): Promise<MeResponse> {
    return this.contract()
      .methods.getMe()
      .call({ from: this.walletAddress })
      .then((res) => {
        const m: MeResponse = {
          id: res[0],
          name: res[1],
          bio: res[2],
          email: res[3],
          header_image_url: res[4],
          avatar_image_url: res[5],
          timestamp: res[6],
        }
        return m
      })
  }

  getAccount(id: string): Promise<AccountResponse> {
    return this.contract()
      .methods.getAccount(id)
      .call({ from: this.walletAddress })
      .then((res) => {
        const a: AccountResponse = {
          id: res[0],
          name: res[1],
          bio: res[2],
          header_image_url: res[3],
          avatar_image_url: res[4],
          timestamp: res[5],
        }
        return a
      })
      .catch((e: Error) => {
        throw e
      })
  }

  getAccounts(): Promise<AccountResponse[]> {
    return this.contract()
      .methods.getAccounts()
      .call({ from: this.walletAddress })
      .then((res) => {
        const accounts: AccountResponse[] = []
        res.forEach((r) => {
          const a: AccountResponse = {
            id: r[0],
            name: r[1],
            bio: r[2],
            header_image_url: r[3],
            avatar_image_url: r[4],
            timestamp: r[5],
          }
          accounts.push(a)
        })
        return accounts
      })
      .catch((e: Error) => {
        throw e
      })
  }

  getUserRankings(): Promise<UserRanking[]> {
    return this.contract()
      .methods.getRankings()
      .call({ from: this.walletAddress })
      .then((res) => {
        const rankings: UserRanking[] = []
        res.forEach((r) => {
          const a: UserRanking = {
            id: r[0],
            rank: Number(r[1]),
            name: r[2],
            avatar_image_url: r[3],
          }
          rankings.push(a)
        })
        return rankings
      })
      .catch((e: Error) => {
        throw e
      })
  }
}
