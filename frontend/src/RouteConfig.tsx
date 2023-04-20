import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { CollectionView } from './views/main/collection/CollectionView'
import { ProductCreateView } from './views/main/product/ProductCreateView'

import { HomeView } from '@/views/main/home/HomeView'
import { ProfileView } from '@/views/main/user/profile/ProfileView'
import { WalletView } from '@/views/main/wallet/WalletView'

export const ROUTE = {
  home: '/',
  wallet: '/wallet',
  collection: '/collection', // TODO: collection/userID
  profile: '/profile',
  productCreate: '/product/create',
}

export const PRIVATE_ROUTE = {}

export const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTE.home} element={<HomeView />} />
      <Route path={ROUTE.wallet} element={<WalletView />} />
      <Route path={`${ROUTE.collection}/:userID`} element={<CollectionView />} />
      <Route path={ROUTE.profile} element={<ProfileView />} />
      <Route path={ROUTE.productCreate} element={<ProductCreateView />} />
    </Routes>
  </BrowserRouter>
)
