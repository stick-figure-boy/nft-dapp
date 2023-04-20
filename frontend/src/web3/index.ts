import Web3 from 'web3'
const web3 = new Web3('http://localhost:8545')

if (typeof window.ethereum === 'undefined') {
  throw new Error('Please install Metamask.')
}

export class Web3Factory {
  getAccount() {
    return web3.eth
      .getAccounts()
      .then((x) => {
        return x[0]
      })
      .catch((e: Error) => {
        throw e
      })
  }

  getWeb3() {
    return web3
  }

  async getBalance(address: string) {
    return await web3.eth
      .getBalance(address)
      .then((res) => {
        return web3.utils.fromWei(res, 'ether')
      })
      .catch((e: Error) => {
        throw e
      })
  }
}
