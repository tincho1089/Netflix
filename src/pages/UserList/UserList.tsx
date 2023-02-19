import { selectProfiles } from '@/redux/states/profile'
import { createUser } from '@/redux/states/user'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import iconPlus from '../../assets/icons/iconPlus.png'
import { ModalCreate } from './components/ModalCreate'
import { ProfileCard } from './components/ProfileCard'
import { SplashScreen } from './components/SplashScreen'
import { Profile } from './UserList+Helper'
import './UserList.scss'

const UserList: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const stateProfiles = useSelector(selectProfiles)

  const HandleClick = (user: Profile) => {
    dispatch(createUser(user))
  }

  useEffect(() => {
    if (loading) {
      if (!localStorage.getItem('loading')) {
        localStorage.setItem('loading', 'ok')
      }
    }
  }, [loading])

  return (
    <Fragment>
      {!localStorage.getItem('loading') ? (
        <SplashScreen videoEnded={setLoading} />
      ) : (
        <Fragment>
          {openModal ? (
            <ModalCreate closeModal={() => setOpenModal(false)} />
          ) : (
            <div className='users'>
              <div className='users-main'>
                <div className='users-title'>
                  <h1>Who is watching?</h1>
                </div>
                <div className='users-list'>
                  {stateProfiles.map((user: Profile) => (
                    <Link to='/Private/Home' key={user.id}>
                      <ProfileCard profile={user} editMode={false} onClick={() => HandleClick(user)} />
                    </Link>
                  ))}
                  <div className='profile-card' onClick={() => setOpenModal(true)}>
                    <img className='profile-card-img' src={iconPlus} alt='add' />
                    <div className='profile-card-name'>Add Profile</div>
                  </div>
                </div>
                <Link to='/ManageProfiles'>
                  <div className='users-admin'>Manage profiles</div>
                </Link>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default UserList
