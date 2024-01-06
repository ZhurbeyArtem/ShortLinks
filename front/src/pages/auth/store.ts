import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { User, IAuth } from "./interface"

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (build) => ({
    login: build.mutation<User, IAuth>({
      query: (data) => ({
          url: '/login',
          method: "POST",
          body: data
      })
    }),
    registration: build.mutation<User, IAuth>({
      query(data) {
        return {
          url: '/registration',
          method: "POST",
          body: data
        }
      }
    })


  })
})