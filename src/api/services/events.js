import { apiSlice } from '../../../src/api/apiSlice';
import Cookies from 'js-cookie';


export const events = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (credentials) => ({
        url: 'event/create',
        method: 'POST',
        body: credentials,
      }),
    }),

    show: builder.query({
      query: () => ({
        url: 'event/show/13',
        method: 'GET',
      }),
    }), 

    
  }),
});


export const {useCreateMutation,useShowQuery } = events;
