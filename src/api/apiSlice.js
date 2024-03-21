import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from './constants';

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    credentials: 'same-origin',
    baseUrl: URL,
  }),
  tagTypes: ['one-org'],

  endpoints: () => ({}),
});
