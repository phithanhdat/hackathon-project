import { createSlice } from '@reduxjs/toolkit'
import {
  getTokenFromCookies,
  getUserFromCookies,
} from '../../utils/cookiesFunction'

const authSliceReducer = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromCookies() || null,
    access_token: getTokenFromCookies() || null,
  },
  reducers: {
    setCredentials: (state, { payload: { access_token, user } }) => {
      state.access_token = access_token
      state.user = user
    },
    setProfile: (state, { payload: { user } }) => {
      state.user = user
    },
    logout: (state) => {
      state.user = null
      state.access_token = null
    },
  },
})
export const { setCredentials, setProfile, logout } = authSliceReducer.actions
export default authSliceReducer.reducer
// export const selectCurrentUser = (state: RootState) => state.auth.user
