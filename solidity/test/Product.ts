import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

const toWei = (num: number) => ethers.utils.parseEther(num.toString())

describe('Product', () => {
  const id = 0
  const fee = toWei(0.002)

  const productDummyData = {
    sellerID: id,
    name: 'product1',
    imageURL: 'http://test.png',
    description: 'description',
    price: 10,
  }

  async function deployProductFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const Product = await ethers.getContractFactory('Product')
    const contract = await Product.deploy(fee)

    return { contract, owner, otherAccount }
  }

  describe('Deployment', async () => {
    it('Should confirm deployer address', async () => {
      const { contract, owner } = await loadFixture(deployProductFixture)
      expect(await contract.owner()).to.equal(owner.address)
    })

    it('Should Tax on product', async () => {
      const { contract } = await loadFixture(deployProductFixture)
      expect(await contract.fee()).to.equal(fee)
    })
  })

  describe('Get', () => {
    it('Should confirm product list', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      await contract.createProduct(productDummyData, {
        from: owner.address,
        value: fee,
      })
      const products = await contract.getProducts()
      expect(products).to.have.lengthOf(1)
    })

    it('Should confirm recommend product list', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      for (let index = 0; index < 11; index++) {
        await contract.createProduct(productDummyData, {
          from: owner.address,
          value: fee,
        })
      }

      const products = await contract.getRecommendProducts()
      expect(products).to.have.lengthOf(10)
    })

    it('Should confirm product list by seller', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      for (let index = 0; index < 10; index++) {
        if (index % 2 == 0) {
          const req = { ...productDummyData }
          req.sellerID = 1
          await contract.connect(otherAccount).createProduct(req, {
            from: otherAccount.address,
            value: fee,
          })
        } else {
          await contract.createProduct(productDummyData, {
            from: owner.address,
            value: fee,
          })
        }
      }

      const products = await contract.getProductsBySeller(id)
      expect(products).to.have.lengthOf(5)
    })

    describe('Find', () => {
      it('Should confirm product find', async () => {
        const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
        await contract.createProduct(productDummyData, {
          from: owner.address,
          value: fee,
        })
        const product = await contract.getProduct(id)
        expect(product.name).to.equal('product1')
        expect(product.description).to.equal('description')
        expect(product.imageURL).to.equal('http://test.png')
        expect(product.price).to.equal(10)
      })

      it('Should confirm product not found', async () => {
        const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
        await expect(contract.getProduct(99)).to.be.revertedWith('Product not found')
      })

      it('Should confirm product has been deleted', async () => {
        const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
        await contract.createProduct(productDummyData, {
          from: owner.address,
          value: fee,
        })
        await contract.deleteProduct(id)
        await expect(contract.getProduct(id)).to.be.revertedWith('Product has been deleted')
      })
    })
  })

  describe('Creation', () => {
    it('Should confirm product creation', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      await contract.createProduct(productDummyData, {
        from: owner.address,
        value: fee,
      })
      const product = await contract.getProduct(id)
      expect(product.id).to.equal(id)
      expect(product.name).to.equal('product1')
    })

    it('Should confirm product creation error', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      const requests = [
        {
          name: '',
          description: 'description',
          imageURL: 'http://test.png',
          price: 10,
          expected: 'name cannot be empty',
        },
        {
          name: 'product1',
          description: '',
          imageURL: 'http://test.png',
          price: 10,
          expected: 'description cannot be empty',
        },
        {
          name: 'product1',
          description: 'description',
          imageURL: '',
          price: 10,
          expected: 'image URL cannot be empty',
        },
        {
          name: 'product1',
          description: 'description',
          imageURL: 'http://test.png',
          price: 0,
          expected: 'price cannot be empty',
        },
      ]

      requests.forEach(async (req) => {
        await expect(contract.createProduct(req)).to.be.revertedWith(req.expected)
      })
    })
  })

  describe('Update', () => {
    it('Should confirm product update', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      await contract.createProduct(productDummyData, {
        from: owner.address,
        value: fee,
      })
      const req = {
        id,
        name: 'product2',
        description: 'description2',
        imageURL: 'http://test2.png',
        price: 20,
      }
      await contract.updateProduct(req)
      const product = await contract.getProduct(id)
      expect(product.id).to.equal(id)
      expect(product.name).to.equal('product2')
    })

    it('Should confirm product update error', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      await contract.createProduct(productDummyData, {
        from: owner.address,
        value: fee,
      })
      const requests = [
        {
          name: '',
          description: 'description',
          imageURL: 'http://test.png',
          price: 10,
          expected: 'name cannot be empty',
        },
        {
          name: 'product1',
          description: '',
          imageURL: 'http://test.png',
          price: 10,
          expected: 'description cannot be empty',
        },
        {
          name: 'product1',
          description: 'description',
          imageURL: '',
          price: 10,
          expected: 'image URL cannot be empty',
        },
        {
          name: 'product1',
          description: 'description',
          imageURL: 'http://test.png',
          price: 0,
          expected: 'price cannot be empty',
        },
      ]

      requests.forEach(async (req) => {
        await expect(contract.updateProduct(req)).to.be.revertedWith(req.expected)
      })
    })

    it('Should confirm Unauthorize Personal', async () => {
      const { contract, owner, otherAccount } = await loadFixture(deployProductFixture)
      await contract.createProduct(productDummyData, {
        from: owner.address,
        value: fee,
      })
      const req = {
        id,
        name: 'product2',
        description: 'description2',
        imageURL: 'http://test2.png',
        price: 20,
      }
      await expect(contract.connect(otherAccount).updateProduct(req)).to.be.revertedWith('Unauthorize Personal')
    })
  })
})
