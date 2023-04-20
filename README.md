# NFT DApp Sample Project

This is a NFT sample project using Hardhat and React.

# Requirement

- [React 18](https://en.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Solidity](https://solidity-jp.readthedocs.io/ja/latest/)
- [Hardhat](https://hardhat.org/)
- [Metamask](https://metamask.io/)
- [web3.js](https://web3js.readthedocs.io/en/v1.8.1/)
- [Material Tailwind](https://www.material-tailwind.com/docs/react/installation)
- [tailwind css](https://v1.tailwindcss.com/docs/installation)

# Installation

Add the Metamask Chrome extension.

[Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja)

# Usage

## Contracts

1. Hardhat set up.

   ```bash
   $ cd ./solidity
   $ npm i
   ```

2. Compiling contracts.

   ```bash
   $ cd ./solidity
   $ make compile
   ```

3. Connecting a wallet to Hardhat Network

   ```bash
   $ cd ./solidity
   $ make launch
   ```

4. Deploying contracts.

   ```bash
   $ cd ./solidity
   $ make deploy
   ```

   The address displayed at this time is the contract address.

   ```
   Product deployed to: 0xxxxxxxxxxxxxxx
   User deployed to: 0xxxxxxxxxxxxxxx
   ```

   Set this address to the ".env" of your frontend project.

   ```bash
   cd ./frontend
   cp .env.example .env
   ```

   ```.env
   .env
   REACT_APP_PRODUCT_CONTRACT_ADDRESS={your Product contract address}
   REACT_APP_USER_CONTRACT_ADDRESS={your User contract address}
   ```

5. Add the Metamask network.
   Add a network to Metamask with the following contents.

   ```
   Network Name: harthat
   RPC Url: http://localhost:8545
   Chain ID: 1337
   Symbol: ETH
   ```

6. Import your account into Metamask.
   Switch the Metamask network to the network added in step 5.
   Next, click on the account icon and select import account from the menu.
   Select "Private Key" in "Select Type" and enter the private key obtained in step 3.

   ````
   example)
    $ cd ./solidity
    $ make launch

    When this is executed, the terminal will display the following.
    ```
    Account #0: 0xxxxxxxxxxxxx (10000 ETH)
    Private Key: 0xxxxxxxxxxxxx
    ```
   ````

7. After editing the Contract file, execute the Compile command.

   ```
   $ cd ./solidity
   $ make compile
   ```

   At this time, a contract type file is generated in the "types/web3-v1-contracts" directory.
   This is used to implement the code type-safely in the frontend project.

8. Testing.
   ```
   $ cd ./solidity
   $ make testing-all
   or
   $ make testing f={filename}
   ```

## Frontend Project

1. Npm Install.

   ```
   $ cd ./frontend
   $ npm i
   ```

2. Create a symbolic link to the contract project.

   ```
   $ cd ./solidity
   $ npm link
   $ cd ./frontend
   $ npm link solidity
   ```

   `npm link solidity`: This is removed each time "npm i" is run, so it must be run again when a new package is installed.

3. Start Project.

   ```
   $ cd ./frontend
   $ npm start
   ```

   go to http://localhost:3000

   Caution: Make sure Hardhat is running (make launch) before executing "npm start."
