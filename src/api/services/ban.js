import { apiSlice } from '../apiSlice';

export const ban = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        blockUser: builder.mutation({
            query: (body) => ({
                url: 'organization/block-attendee',
                method: 'POST',
                body: body,
            }),
        }),
        unBlockUser: builder.mutation({
            query: (body) => ({
                url: 'organization/unblock-attendee',
                method: 'POST',
                body: body,
            }),
        }),
        blockList: builder.query({
            query: () => ({
                url: 'organization/blacklist',
                method: 'GET',
            }),
        }),
        isBlocked: builder.query({
            query: (id) => ({
                url: `organization/is-blocked/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useBlockUserMutation, useUnBlockUserMutation, useBlockListQuery, useIsBlockedQuery } = ban;
