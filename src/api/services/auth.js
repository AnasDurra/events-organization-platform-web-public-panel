import { apiSlice } from '../../../src/api/apiSlice';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const auth = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: 'attendee/register',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['auth'],
            transformResponse: (responseData) => {
                Cookies.set('accessToken', responseData?.result?.access_token, {
                    expires: 12,
                });
                Cookies.set('refreshToken', responseData?.result?.refresh_token, {
                    expires: 12,
                });
                return responseData;
            },
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['auth'],
            transformResponse: (responseData) => {
                console.log(responseData?.result);
                Cookies.set('user', JSON.stringify(responseData?.result), {
                    expires: 12,
                });
                Cookies.set('accessToken', responseData?.result?.access_token, {
                    expires: 12,
                });
                Cookies.set('refreshToken', responseData?.result?.refresh_token, {
                    expires: 12,
                });
                return responseData;
            },
        }),

        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['auth'],
            transformResponse: (responseData) => {
                console.log('hello ', responseData);
                if (responseData?.statusCode == 200) {
                    Cookies.remove('user', { path: '/' });
                    Cookies.remove('accessToken', { path: '/' });
                    Cookies.remove('refreshToken', { path: '/' });
                }
                return responseData;
            },
        }),

        refresh: builder.query({
            query: (refresh_token) => ({
                url: 'attendee/refresh-token',
                method: 'GET',
                headers: { Authorization: `Bearer ${refresh_token}` },
                // body: refresh_token,
            }),
        }),

        userMenu: builder.query({
            query: () => ({
                url: 'user/menu',
                method: 'GET',
            }),
        }),

        checkAccessToken: builder.query({
            query: () => ({
                url: 'user/exchange',
                method: 'GET',
            }),
            providesTags: ['auth'],
        }),
    }),
});

export const getLoggedInUser = () => {
    const token = Cookies.get('accessToken');
    const decodedToken = jwtDecode(token);

    return decodedToken;
};

export const getLoggedInUserV2 = () => {
    if (Cookies.get('user')) {
        return JSON.parse(Cookies.get('user'));
    }
    return null;
};

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useUserMenuQuery, useCheckAccessTokenQuery } =
    auth;
