import { apiSlice } from '../apiSlice';

export const attendeeProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        viewMyProfile: builder.query({
            query: () => ({
                url: 'attendee/my-profile',
                method: 'GET',
            }),
            // transformResponse: (responseData) => {
            //   Cookies.set('accessToken', responseData?.accessToken, {
            //     expires: 12,
            //   });
            //   Cookies.set('refreshToken', responseData?.accessToken, {
            //     expires: 12,
            //   });
            //   return responseData;
            // },
        }),
        viewAttendeeProfile: builder.query({
            query: (id) => ({
                url: `attendee/profile/${id}`,
                method: 'GET',
            }),
            // transformResponse: (responseData) => {
            //   Cookies.set('accessToken', responseData?.accessToken, {
            //     expires: 12,
            //   });
            //   Cookies.set('refreshToken', responseData?.accessToken, {
            //     expires: 12,
            //   });
            //   return responseData;
            // },
        }),

        updateMyProfile: builder.mutation({
            query: (credentials) => ({
                url: 'attendee/update-profile',
                method: 'POST',
                body: credentials,
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
    useShowAttendeeEventsQuery,
} = attendeeProfile;
