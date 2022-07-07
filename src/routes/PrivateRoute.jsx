import PropTypes from 'prop-types'

import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hook'

export default function PrivateRoute({ children }) {
  const location = useLocation()

  const { access_token } = useAppSelector((state) => state.auth)

  if (!access_token) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    <>
      <main className="main-content">{children}</main>
    </>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
}
