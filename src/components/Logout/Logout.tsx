import { PublicRoutes } from '@/models'
import { resetUser } from '@/redux/states/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(resetUser())
    navigate(`/${PublicRoutes.USERLIST}`, { replace: true })
  }
  return (
    <div className='nav-profile-menu-signout' onClick={logOut}>
      Sign out of Netflix
    </div>
  )
}
export default Logout
