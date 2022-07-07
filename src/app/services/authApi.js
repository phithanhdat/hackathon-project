import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../config/axiosFetchBaseQuery'

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['authApi'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ payloadLogin }) => ({
        url: 'login',
        method: 'POST',
        body: payloadLogin,
      }),
      invalidatesTags: ['login'],
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: '/signup',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['register'],
    }),
  }),
})

// Export hooks for usage in functional components
export const { useLoginMutation, useRegisterMutation } = authApi
