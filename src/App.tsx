import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { RoutesManager } from './components'
import { AuthGuard } from './guards'
import { PrivateRoutes, PublicRoutes } from './models'
import { RoutesWithNotFound } from './utilities'
const ManageProfiles = lazy(() => import('./pages/ManageProfiles/ManageProfiles'))
const UserList = lazy(() => import('./pages/UserList/UserList'))
const Home = lazy(() => import('./pages/Home/Home'))

function App() {
  return (
    <div className='App'>
      <RoutesManager>
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`} />} />
          <Route path={PublicRoutes.USERLIST} element={<UserList />} />
          <Route path={PublicRoutes.MANAGEPROFILES} element={<ManageProfiles />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`} element={<Home />} />
          </Route>
        </RoutesWithNotFound>
      </RoutesManager>
    </div>
  )
}

export default App
