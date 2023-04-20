import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

const toWei = (num: number) => ethers.utils.parseEther(num.toString())

describe('User', async () => {
  const id = 0
  const fee = toWei(0.002)

  const userDummyData = {
    name: 'account1',
    bio: 'bio',
    email: 'test@example.com',
    headerImageURL: 'http://test.png',
    avatarImageURL: 'http://test.png',
  }

  async function deployUserFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const User = await ethers.getContractFactory('User')
    const contract = await User.deploy(fee)

    return { contract, owner, otherAccount }
  }

  describe('Deployment', async () => {
    it('Should confirm deployer address', async () => {
      const { contract, owner } = await loadFixture(deployUserFixture)
      expect(await contract.owner()).to.equal(owner.address)
    })

    it('Should Tax on account', async () => {
      const { contract } = await loadFixture(deployUserFixture)
      expect(await contract.fee()).to.equal(fee)
    })
  })

  describe('Get', () => {
    it('Should confirm account list', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const accounts = await contract.getAccounts()
      expect(accounts).to.have.lengthOf(1)
    })

    describe('Find', () => {
      it('Should confirm account find', async () => {
        const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
        await contract.createAccount(userDummyData, {
          from: owner.address,
          value: fee,
        })
        const account = await contract.getAccount(id)
        expect(account.name).to.equal('account1')
        expect(account.bio).to.equal('bio')
        expect(account.headerImageURL).to.equal('http://test.png')
        expect(account.avatarImageURL).to.equal('http://test.png')
      })

      it('Should confirm account not found', async () => {
        const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
        await expect(contract.getAccount(99)).to.be.revertedWith('Account not found')
      })

      it('Should confirm account has been deleted', async () => {
        const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
        await contract.createAccount(userDummyData, {
          from: owner.address,
          value: fee,
        })
        await contract.deleteAccount(id)
        await expect(contract.getAccount(0)).to.be.revertedWith('Account has been deleted')
      })
    })

    it('Should confirm account me', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const account = await contract.getMe()
      expect(account.name).to.equal('account1')
      expect(account.bio).to.equal('bio')
      expect(account.email).to.equal('test@example.com')
      expect(account.headerImageURL).to.equal('http://test.png')
      expect(account.avatarImageURL).to.equal('http://test.png')
      expect(account.floorPrice).to.equal(0)
      expect(account.totalVolume).to.equal(0)
    })
  })

  describe('Creation', () => {
    it('Should confirm account creation', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const account = await contract.getAccount(id)
      expect(account.id).to.equal(id)
      expect(account.name).to.equal('account1')
    })

    it('Should confirm account creation error', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      const requests = [
        {
          name: '',
          bio: 'bio',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: 'http://test.png',
          expected: 'name cannot be empty',
        },
        {
          name: 'account1',
          bio: '',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: 'http://test.png',
          expected: 'bio cannot be zero',
        },
        {
          name: 'account1',
          bio: 'bio',
          email: '',
          headerImageURL: 'http://test.png',
          avatarImageURL: 'http://test.png',
          expected: 'email cannot be empty',
        },
        {
          name: 'account1',
          bio: 'bio',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: '',
          expected: 'header image URL cannot be empty',
        },
        {
          name: 'account1',
          bio: 'bio',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: '',
          expected: 'avatar image URL cannot be empty',
        },
      ]

      requests.forEach(async (req) => {
        await expect(contract.createAccount(req)).to.be.revertedWith(req.expected)
      })
    })

    it('Should confirm already has an account', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      await expect(
        contract.createAccount(userDummyData, {
          from: owner.address,
          value: fee,
        })
      ).to.be.revertedWith('This contract address is already has an account')
    })

    it('Should confirm name is already in use', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      await expect(
        contract.connect(otherAccount).createAccount(userDummyData, {
          from: otherAccount.address,
          value: fee,
        })
      ).to.be.revertedWith('This account name is already in use')
    })
  })

  describe('Update', () => {
    it('Should confirm account update', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const req = {
        id,
        name: 'account2',
        bio: 'comment2',
        email: 'test@example.com',
        headerImageURL: 'http://test2.png',
        avatarImageURL: 'http://test2.png',
      }
      await contract.updateAccount(req)
      const account = await contract.getAccount(id)
      expect(account.id).to.equal(id)
      expect(account.name).to.equal('account2')
    })

    it('Should confirm account update error', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const requests = [
        {
          name: '',
          bio: 'bio',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: 'http://test.png',
          expected: 'name cannot be empty',
        },
        {
          name: 'account1',
          bio: '',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: 'http://test.png',
          expected: 'bio cannot be zero',
        },
        {
          name: 'account1',
          bio: 'bio',
          email: '',
          headerImageURL: 'http://test.png',
          avatarImageURL: 'http://test.png',
          expected: 'email cannot be empty',
        },
        {
          name: 'account1',
          bio: 'bio',
          email: 'test@example.com',
          headerImageURL: '',
          avatarImageURL: 'http://test.png',
          expected: 'header image URL cannot be empty',
        },
        {
          name: 'account1',
          bio: 'bio',
          email: 'test@example.com',
          headerImageURL: 'http://test.png',
          avatarImageURL: '',
          expected: 'avatar image URL cannot be empty',
        },
      ]

      requests.forEach(async (req) => {
        await expect(contract.updateAccount(req)).to.be.revertedWith(req.expected)
      })
    })

    it('Should confirm Unauthorize Personal', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const req = {
        id,
        name: 'account2',
        bio: 'comment2',
        email: 'test@example.com',
        headerImageURL: 'http://test2.png',
        avatarImageURL: 'http://test2.png',
      }
      await expect(contract.connect(otherAccount).updateAccount(req)).to.be.revertedWith('Unauthorize Personal')
    })
  })

  describe('Deletion', () => {
    it('Should confirm product deletion', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      const account = await contract.getAccount(id)
      expect(account.id).to.equal(id)
      await contract.deleteAccount(id)
      await expect(contract.getAccount(id)).to.revertedWith('Account has been deleted')
    })

    it('Should confirm Unauthorize Personal', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployUserFixture)
      await contract.createAccount(userDummyData, {
        from: owner.address,
        value: fee,
      })
      await expect(contract.connect(otherAccount).deleteAccount(id)).to.be.revertedWith('Unauthorize Personal')
    })
  })
})
