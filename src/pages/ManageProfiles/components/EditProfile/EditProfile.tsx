import React from 'react'
import './EditProfile.scss'
import iconArrow from '@/assets/icons/iconArrowLeft.png'
import { ProfileClassics, ProfileFavorites } from './EditProfile+Helper'
import { Profile } from '@/models'
import { IconDTO } from '@/pages/UserList'

interface EditProfileProps {
  profile: Profile
  closeModal: () => void
  selectedIcon: (icon: IconDTO) => void
}

const EditProfile: React.FC<EditProfileProps> = (props) => {
  const HandleClick = ({ ...icon }: IconDTO) => {
    props.selectedIcon(icon)
    props.closeModal()
  }

  return (
    <div className='edit-profile'>
      <div className='ep-nav-container'>
        <div className='ep-nav'>
          <div className='ep-nav-left'>
            <img src={iconArrow} alt='goback' className='ep-nav-icon white' onClick={props.closeModal} />
            <div className='ep-nav-text'>
              <h1>Edit profile</h1>
              <h2>Choose an icon for the profile</h2>
            </div>
          </div>
          <div className='ep-nav-right'>
            <h2 className='ep-nav-name'>{props.profile.name}</h2>
            <img className='ep-nav-img' {...props.profile.icon} />
          </div>
        </div>
      </div>
      <div className='ep-options-container'>
        <div className='ep-options'>
          <h1 className='ep-options-title'>Classics</h1>
          <div className='ep-options-main'>
            {ProfileClassics.map((image) => (
              <img key={image.alt} {...image} className='ep-options-img' onClick={() => HandleClick(image)}></img>
            ))}
          </div>
          <h1 className='ep-options-title'>Martin favorites</h1>
          <div className='ep-options-main'>
            {ProfileFavorites.map((image) => (
              <img key={image.alt} {...image} className='ep-options-img' onClick={() => HandleClick(image)}></img>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
