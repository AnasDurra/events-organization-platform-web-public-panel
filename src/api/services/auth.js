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
            transformResponse: (responseData) => {
                Cookies.set('accessToken', responseData?.accessToken, {
                    expires: 12,
                });
                Cookies.set('refreshToken', responseData?.accessToken, {
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
            transformResponse: (responseData) => {
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

        // logout: builder.mutation({
        //   query: () => ({
        //     url: 'auth/logout',
        //     method: 'POST',
        //   }),
        // }),

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
    }),
});

export const getLoggedInUser = () => {
    const token = Cookies.get('accessToken');
    const decodedToken = jwtDecode(token);

    return decodedToken;
};

export const getLoggedInUserV2 = () => {
    return JSON.parse(Cookies.get('user'));
};

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useUserMenuQuery } = auth;
