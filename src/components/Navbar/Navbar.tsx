import iconArrow from '@/assets/icons/iconArrow.png'
import iconHelp from '@/assets/icons/iconHelp.png'
import iconNotif from '@/assets/icons/iconNotif.png'
import iconPencil from '@/assets/icons/iconPencil.png'
import iconSearch from '@/assets/icons/iconSearch.png'
import iconTransfer from '@/assets/icons/iconTransfer.png'
import iconUser from '@/assets/icons/iconUser.png'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.png'
import { selectProfiles } from '@/redux/states/profile'
import { AppStore } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '@/pages/UserList'
import './Navbar.scss'
import { Logout } from '@/components/Logout'
import { createUser } from '@/redux/states/user'
import { SnackbarUtilities } from '@/utilities'
import { PublicRoutes } from '@/models'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My list', 'Browse by Languages']
  const [user, setUser] = useState<Profile | null>(null)
  const stateProfiles = useSelector(selectProfiles)
  const userState = useSelector((store: AppStore) => store.user)

  useEffect(() => {
    const AddNavClass = () => {
      const nav = document.querySelector('nav')
      nav?.classList.toggle('nav-color', window.scrollY > 0)
    }
    window.addEventListener('scroll', AddNavClass)

    return () => window.removeEventListener('scroll', AddNavClass)
  }, [])

  useEffect(() => {
    setUser(userState)
  }, [userState])

  const HandleClick = (user: Profile) => {
    dispatch(createUser(user))
    SnackbarUtilities.warning(`User changed to ${user.name}`)
  }

  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <Link to='/'>
          <img className='nav-logo-img' src={logo} alt='netflix' />
        </Link>

        <ul className='nav-list'>
          {items.map((item) => (
            <li className='nav-list-item' key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className='nav-right'>
        <div className='nav-search'>
          <img className='nav-icon-search' src={iconSearch} alt='search' />
        </div>
        <div className='nav-children'>Kids</div>
        <div className='nav-notif'>
          <img className='nav-icon-notif' src={iconNotif} alt='noti' />
        </div>
        <div className='nav-profile'>
          <img className='nav-profile-img' src={user?.icon.src} alt={user?.icon.alt} />
          <img className='nav-icon-arrow' src={iconArrow} alt='arrow' />
          <div className='nav-profile-menu'>
            <div className='nav-profile-menu-users'>
              {stateProfiles
                .filter((profiles: Profile) => profiles.id !== user?.id)
                .map((profiles: Profile) => (
                  <div className='nav-profile-menu-users-item' key={profiles.id} onClick={() => HandleClick(profiles)}>
                    <img className='nav-profile-img' {...profiles.icon} />
                    <div>{profiles.name}</div>
                  </div>
                ))}
              <div className='nav-profile-menu-users-item'>
                <img className='nav-profile-icon white' src={iconPencil} alt='edit' />
                <div onClick={() => navigate(`/${PublicRoutes.MANAGEPROFILES}`, { replace: false })}>Manage Profiles</div>
              </div>
              <div className='nav-profile-menu-users-item'>
                <img className='nav-profile-icon white' src={iconTransfer} alt='transfer' />
                <div>Transfer Profile</div>
              </div>
              <div className='nav-profile-menu-users-item'>
                <img className='nav-profile-icon white' src={iconUser} alt='user' />
                <div>Account</div>
              </div>
              <div className='nav-profile-menu-users-item'>
                <img className='nav-profile-icon white' src={iconHelp} alt='help' />
                <div>Help Center</div>
              </div>
            </div>
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
