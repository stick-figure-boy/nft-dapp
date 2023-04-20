import { atom } from 'recoil'

import { MeResponse } from '@/contracts/user/types'
import { RecoilAtomKeys } from '@/store/RecoilKeys'

export const accountState = atom<MeResponse>({
  key: RecoilAtomKeys.USER_STATE.ACCOUNT,
  default: {
    id: '',
    name: '',
    bio: '',
    email: '',
    header_image_url: '',
    avatar_image_url: '',
    timestamp: '',
  },
})
