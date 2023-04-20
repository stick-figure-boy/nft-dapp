import { atom } from 'recoil'

import { RecoilAtomKeys } from '@/store/RecoilKeys'

export const addressState = atom<string>({
  key: RecoilAtomKeys.WALLET_STATE.ADDRESS,
  default: '',
})
