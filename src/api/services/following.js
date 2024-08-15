import { apiSlice } from '../apiSlice';

export const following = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        followOrg: builder.mutation({
            query: (body) => ({
                url: 'attendee/follow-org',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['followers-list'],
        }),
        unFollowOrg: builder.mutation({
            query: (body) => ({
                url: 'attendee/unfollow-org',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['followers-list'],
        }),
        followersList: builder.query({
            query: (id) => ({
                url: `organization/followers-list/${id}`,
                method: 'GET',
            }),
            providesTags: ['followers-list'],
        }),
        followedOrgs: builder.query({
            query: () => ({
                url: 'attendee/followed-organizations',
                method: 'GET',
            }),
            providesTags: ['followers-list'],
        }),
        isAttendeeFollowingOrg: builder.query({
            query: (id) => ({
                url: `attendee/is-following/${id}`,
                method: 'GET',
            }),
            providesTags: ['followers-list'],
        }),
    }),
});

export const {
    useFollowOrgMutation,
    useUnFollowOrgMutation,
    useLazyFollowersListQuery,
    useFollowersListQuery,
    useFollowedOrgsQuery,
    useLazyIsAttendeeFollowingOrgQuery,
} = following;
