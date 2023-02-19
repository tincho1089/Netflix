import React, { Fragment } from 'react'
import iconPencil from '../../../../assets/icons/iconPencil.png'
import { Profile } from '../../UserList+Helper'
import './ProfileCard.scss'

interface ProfileCardInterface {
  profile: Profile
  editMode: boolean
  onClick: () => void
}

const ProfileCard: React.FC<ProfileCardInterface> = (props) => {
  // * Methods
  const EditLayerBuilder = () => (
    <div className='profile-card-layer'>
      <img className='profile-card-edit-img' src={iconPencil} alt='edit' />
    </div>
  )

  return (
    <Fragment>
      <div className='profile-card' onClick={props.onClick}>
        {props.editMode && EditLayerBuilder()}
        <img className='profile-card-img' {...props.profile.icon} />
        <div className='profile-card-name'>{props.profile.name}</div>
      </div>
    </Fragment>
  )
}

export default ProfileCard
