import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Resume'],
  endpoints: (builder) => ({
    getResume: builder.query({
      query: () => '/resume',
      providesTags: ['Resume'],
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: '/resume',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Resume'],
    }),
    deleteResume: builder.mutation({
      query: () => ({
        url: '/resume',
        method: 'DELETE',
      }),
      invalidatesTags: ['Resume'],
    }),
  }),
});

export const {
  useGetResumeQuery,
  useUploadResumeMutation,
  useDeleteResumeMutation,
} = resumeApi;
