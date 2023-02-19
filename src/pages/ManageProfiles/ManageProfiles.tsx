import { initialProfileState } from '@/redux/states/profile'
import { AppStore } from '@/redux/store'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import iconPlus from '../../assets/icons/iconPlus.png'
import { ModalCreate, ModalEdit, Profile, ProfileCard } from '../UserList'
import './ManageProfiles.scss'

const ManageProfiles: React.FC = () => {
  const stateProfiles = useSelector((store: AppStore) => store.profiles)

  const [selected, setSelected] = useState<Profile>(initialProfileState[0])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  return (
    <Fragment>
      {openEditModal && <ModalEdit closeModal={() => setOpenEditModal(false)} profile={selected} />}
      {openAddModal && <ModalCreate closeModal={() => setOpenAddModal(false)} />}
      <div className='users'>
        <div className='users-main'>
          <div className='users-title'>
            <h1>Manage Profiles: </h1>
          </div>
          <div className='users-list'>
            {stateProfiles.map((profile: Profile) => (
              <ProfileCard
                profile={profile}
                key={profile.id}
                editMode={true}
                onClick={() => {
                  setSelected(profile)
                  setOpenEditModal(true)
                }}
              />
            ))}
            <div className='profile-card' onClick={() => setOpenAddModal(true)}>
              <img className='profile-card-img' src={iconPlus} alt='add' />
              <div className='profile-card-name'>Add Profile</div>
            </div>
          </div>
          <Link to='/'>
            <div className='users-manage'>Done</div>
          </Link>
        </div>
      </div>
    </Fragment>
  )
}

export default ManageProfiles
