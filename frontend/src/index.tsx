import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import { RouterConfig } from '@/RouteConfig'

import '@/index.css'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <RouterConfig />
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>
)

// TODO
// const migrate = async () => {
//   const userABI = new UserABI('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512')

//   await userABI
//     .getAccounts()
//     .then((res) => {
//       if (res.length == 0) {
//         createDummyAccounts()
//         createDummyProducts()
//       }
//     })
//     .catch((e: Error) => {
//       console.log('migrate error')
//     })
// }
// void migrate()
