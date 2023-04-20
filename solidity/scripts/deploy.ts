import { ethers } from 'hardhat'

async function main() {
  const fee = ethers.utils.parseEther('0.002')

  const Product = await ethers.getContractFactory('Product')
  const product = await Product.deploy(fee)
  await product.deployed()

  const User = await ethers.getContractFactory('User')
  const user = await User.deploy(fee)
  await user.deployed()

  console.log('Product deployed to:', product.address)
  console.log('User deployed to:', user.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  process.exitCode = 1
})
