import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body,
      }),
    }),
    getMessages: builder.query({
      query: () => '/contact',
      providesTags: ['Messages'],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useSubmitContactMutation,
  useGetMessagesQuery,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} = contactApi;
