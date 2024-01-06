import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { User, IAuth } from "./interface"

export const authApi = createApi({

  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://back-production-a20c.up.railway.app/users` }),
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