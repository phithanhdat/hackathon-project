import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../config/axiosFetchBaseQuery'

export const roundApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['roundApi'],
  endpoints: (builder) => ({
    getRound: builder.query({
      query: (pathApi) => ({
        url: pathApi,
        method: 'GET',
      }),
      providesTags: ['roundApi'],
    }),
    getQuestion: builder.query({
      query: (pathApi) => ({
        url: pathApi,
        method: 'GET',
      }),
      providesTags: ['roundApi'],
    }),
    updateScore: builder.mutation({
      query: (payload) => ({
        url: '/scores/update',
        method: 'POST',
        data: payload,
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetRoundQuery, useGetQuestionQuery, useUpdateScoreMutation } =
  roundApi
