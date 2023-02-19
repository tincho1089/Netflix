import { Profile } from '@/models'
import { persistLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyUserState: Profile = {
  id: '',
  name: '',
  icon: {
    src: '',
    alt: '',
  },
}

export const Key = 'user'

export const userSlice = createSlice({
  name: Key,
  initialState: localStorage.getItem(Key) ? JSON.parse(localStorage.getItem(Key) as string) : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage<Profile>(Key, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<Profile>(Key, result)
      return result
    },
    resetUser: () => {
      persistLocalStorage<Profile>(Key, EmptyUserState)
      // clearLocalStorage()
      return EmptyUserState
    },
  },
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice
