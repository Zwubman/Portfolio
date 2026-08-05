import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const skillsApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  }),
  tagTypes: ['Skills'],
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => '/skills',
      providesTags: ['Skills'],
    }),
  }),
});

export const { useGetSkillsQuery } = skillsApi;
