import Profile3 from '@/assets/profile-icons/profile-07.png'
import Profile2 from '@/assets/profile-icons/profile-11.png'
import Profile1 from '@/assets/profile-icons/profile-12.png'
import { clearLocalStorage, saveInLocalStorageArray } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'
import { Profile } from '../../pages'
import { AppStore } from '../store'

export const initialProfileState: Profile[] = [
  {
    id: '1',
    name: 'Martin',
    icon: {
      src: Profile1,
      alt: 'Profile1',
    },
  },
  {
    id: '2',
    name: 'Some friend',
    icon: {
      src: Profile2,
      alt: 'Profile2',
    },
  },
  {
    id: '3',
    name: 'Kids',
    icon: {
      src: Profile3,
      alt: 'Profile3',
    },
  },
]

export const Key = 'profiles'

function devolverInitialState() {
  if (localStorage.getItem(Key)) {
    return JSON.parse(localStorage.getItem(Key) as string)
  } else {
    return initialProfileState
  }
}

export const profilesSlice = createSlice({
  name: Key,
  initialState: devolverInitialState(),
  reducers: {
    createProfile: (state, action) => {
      state.push(action.payload)
      saveInLocalStorageArray<Profile[]>(Key, state)
      return state
    },
    modifyProfile: (state, action) => {
      const editedProfile = action.payload
      const foundProfile = state.find((profile: Profile) => profile.id === editedProfile.id)
      if (editedProfile.name) foundProfile.name = editedProfile.name
      if (editedProfile.icon) foundProfile.icon = editedProfile.icon
      saveInLocalStorageArray<Profile[]>(Key, state)
    },
    deleteProfile: (state, action) => {
      const profileID = action.payload
      const newState = state.filter((profile: Profile) => profile.id !== profileID)
      saveInLocalStorageArray<Profile[]>(Key, [...newState])
      return newState
    },
    resetProfile: () => {
      clearLocalStorage()
      return initialProfileState
    },
  },
})

export const { createProfile, modifyProfile, deleteProfile, resetProfile } = profilesSlice.actions

export const selectProfiles = (state: AppStore) => state.profiles
export default profilesSlice
