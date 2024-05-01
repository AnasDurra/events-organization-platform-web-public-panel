import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from './constants';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        credentials: 'same-origin',
        baseUrl: URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['one-org', 'forms', 'form','event'],

    endpoints: () => ({}),
});
