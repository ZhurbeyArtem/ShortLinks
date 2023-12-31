import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { User, IAuth } from "./interface"

export const authApi = createApi({

  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://${process.env.REACT_APP_BACK_URL}/users` }),
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