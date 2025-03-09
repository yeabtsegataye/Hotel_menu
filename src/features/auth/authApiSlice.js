import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: '/auth/signup',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: {},
        credentials: 'include'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/log-out',
        method: 'POST',
        body: {},
        credentials: 'include'
      })
    }),
    verifyToken: builder.mutation({
      query: ({ token }) => ({
        url: '/auth/verify-token',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      })
    }),
    getcat: builder.query({
      query: (id) => ({
        url: `/cat/menu/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${id}`, // Include the token in the request headers
        },
      }),
     }),

     getfood: builder.query({
      query: ({ hotelID, id }) => ({
        url: `/food/menue_foods/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${hotelID}`,
        },
        credentials: "include",
      }),
    }),
    ////////////////////////////
    getfoodbyid: builder.query({
      query: ({ hotelID, id }) => ({
        url: `/food/menue_foods_details/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${hotelID}`,
        },
        credentials: "include",
      }),
    }),

  })
})

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshMutation,
  useVerifyTokenMutation,
  useLogoutMutation,
  useGetcatQuery,
  useGetfoodQuery,
  useGetfoodbyidQuery
} = authApiSlice;
