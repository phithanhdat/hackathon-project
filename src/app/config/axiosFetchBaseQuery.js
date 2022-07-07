import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { NotificationCPN } from '../../views/component/NotificationCPN'
import { removeCookies, setTokenToCookies } from '../../utils/cookiesFunction'
import { API_BASE_URL } from '../../utils/constants'
import { logout, setCredentials } from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const access_token = getState().auth.access_token
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  const {
    auth: { access_token },
  } = api.getState()

  if (result.error) {
    switch (result.error.status || result.error.originalStatus) {
      case 401:
        // try to get a new token
        if (access_token) {
          const refreshResult = await baseQuery(
            {
              url: '/refresh',
              method: 'POST',
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const payload = {
              access_token: refreshResult.data.access_token,
              user: refreshResult.data.user,
            }
            api.dispatch(setCredentials(payload))
            setTokenToCookies(refreshResult.data.access_token)

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
          } else {
            api.dispatch(logout())
            removeCookies()
            NotificationCPN({
              type: 'error',
              message: 'Error',
              description: result.error.data.error || result.error.error,
            })
            // redirect to login
          }
        } else {
          api.dispatch(logout())
          removeCookies()

          NotificationCPN({
            type: 'error',
            message: 'Error',
            description: result.error.data.error || result.error.error,
          })
          // redirect to login
        }
        break

      case 500:
      case 501:
      case 502:
      case 503:
        NotificationCPN({
          type: 'error',
          message: 'Error',
          description: result.error.error || 'Internal Server Error',
        })
        break
      case 400:
        NotificationCPN({
          type: 'error',
          message: 'Error',
          description: result.error.data.message || result.error.error,
        })
        break
      case 403:
        console.log('Authorize')
        break
    }
  }

  return result
}

export default baseQueryWithReauth
