import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authApi'
import { roundApi } from './services/roundApi'
import authSliceReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [roundApi.reducerPath]: roundApi.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})
