import { apiSlice } from '../apiSlice';

export const ban = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        blockUser: builder.mutation({
            query: (body) => ({
                url: 'organization/block-attendee',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['followers-list', 'blocked-list'],
        }),
        unBlockUser: builder.mutation({
            query: (body) => ({
                url: 'organization/unblock-attendee',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['followers-list', 'blocked-list'],
        }),
        blockList: builder.query({
            query: () => ({
                url: 'organization/blacklist',
                method: 'GET',
            }),
            providesTags: ['followers-list', 'blocked-list'],
        }),
        isBlocked: builder.query({
            query: (id) => ({
                url: `organization/is-blocked/${id}`,
                method: 'GET',
            }),
            providesTags: ['followers-list'],
        }),
    }),
});

export const { useBlockUserMutation, useUnBlockUserMutation, useBlockListQuery, useLazyIsBlockedQuery } = ban;
