import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../../services/store";

interface Link {
  _id: string,
  oldLink: string,
  newLink: string
}

interface Links {
  data: Link[],
  count: number
}

export const linksApi = createApi({
  reducerPath: 'linksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Links'],
  endpoints: (builder) => ({
    getAll: builder.query<Links, number>({
      query(page) {
        return {
          url: '',
          params: {
            page
          }
        }


      },
      providesTags: ['Links']
    }),
    create: builder.mutation<Link, string>({
      query(link) {
        return {
          url: '',
          method: "POST",
          body: { link: link }
        }
      },
      invalidatesTags: ['Links']
    }),
    delete: builder.mutation<string, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ['Links']
    })
  })


})