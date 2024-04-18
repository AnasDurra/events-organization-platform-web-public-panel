import { apiSlice } from '../apiSlice';

export const following = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        followOrg: builder.mutation({
            query: (body) => ({
                url: 'attendee/follow-org',
                method: 'POST',
                body: body,
            }),
        }),
        unFollowOrg: builder.mutation({
            query: (body) => ({
                url: 'attendee/unfollow-org',
                method: 'POST',
                body: body,
            }),
        }),
        followersList: builder.query({
            query: () => ({
                url: 'organization/followers-list',
                method: 'GET',
            }),
        }),
        followedOrgs: builder.query({
            query: () => ({
                url: 'attendee/followed-organizations',
                method: 'GET',
            }),
        }),
        isAttendeeFollowingOrg: builder.query({
            query: (id) => ({
                url: `attendee/is-following/${id}`,
                method: 'GET',
            }),
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
