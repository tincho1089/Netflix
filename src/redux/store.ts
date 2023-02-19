import { Profile } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user'
import profileSlice from './states/profile'

export interface AppStore {
  user: Profile
  profiles: Profile[]
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    profiles: profileSlice.reducer,
  },
})
