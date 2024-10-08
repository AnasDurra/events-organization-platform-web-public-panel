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
            headers.set('ngrok-skip-browser-warning', true); // TODO: Delete this
            return headers;
        },
    }),
    tagTypes: [
        'one-org',
        'forms',
        'form',
        'form-query',
        'event',
        'did-fill-form',
        'auth',
        'followers-list',
        'blocked-list',
        'tickets-balance',
        'rp-attendee-balance',
        'rp-attendee-history',
        'reports',
        'org-withdraws',
        'org-tickets-balance',
        'confirm-attendance',
        'attendee-status',
        'event-attendees',
    ],

    endpoints: () => ({}),
});
