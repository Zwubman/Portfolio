import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const experiencesApi = createApi({
  reducerPath: 'experiencesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Experiences'],
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: () => '/experiences',
      providesTags: ['Experiences'],
    }),
    createExperience: builder.mutation({
      query: (body) => ({
        url: '/experiences',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Experiences'],
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/experiences/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Experiences'],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experiences'],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experiencesApi;
