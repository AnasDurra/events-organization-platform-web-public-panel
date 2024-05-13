import { apiSlice } from '../apiSlice';

export const attendeeProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        viewMyProfile: builder.query({
            query: () => ({
                url: 'attendee/my-profile',
                method: 'GET',
            }),
        }),
        viewAttendeeProfile: builder.query({
            query: (id) => ({
                url: `attendee/profile/${id}`,
                method: 'GET',
            }),
        }),

        updateMyProfile: builder.mutation({
            query: (credentials) => ({
                url: 'attendee/update-profile',
                method: 'POST',
                body: credentials,
            }),
        }),

        updateProfilePic: builder.mutation({
            query: (body) => ({
                url: 'attendee/update-profile/profile-image',
                method: 'POST',
                body: body,
            }),
        }),
        updateCoverPic: builder.mutation({
            query: (body) => ({
                url: 'attendee/update-profile/cover-image',
                method: 'POST',
                body: body,
            }),
        }),

        showAttendeeEvents: builder.query({
            query: () => ({
                url: `attendee/events`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLazyViewMyProfileQuery,
    useLazyViewAttendeeProfileQuery,
    useUpdateMyProfileMutation,
    useUpdateProfilePicMutation,
    useUpdateCoverPicMutation,
    useShowAttendeeEventsQuery,
} = attendeeProfile;
