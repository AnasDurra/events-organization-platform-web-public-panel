import { apiSlice } from '../../../src/api/apiSlice';

export const events = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: 'event/create',
                method: 'POST',
                body: data,
            }),
        }),

        show: builder.query({
            query: (id) => ({
                url: `event/show/${id}`,
                method: 'GET',
            }),
            providesTags: ['event'],
        }),
        updateDetails: builder.mutation({
            query: ({ id, body }) => ({
                url: `event/update/${id}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags:['event']
        }),
        updateTags: builder.mutation({
            query: ({ id, body }) => ({
                url: `event/update-tags/${id}`,
                method: 'POST',
                body: body,
            }),
        }),
        updateAgeGroups: builder.mutation({
            query: ({ id, body }) => ({
                url: `event/update-age-groups/${id}`,
                method: 'POST',
                body: body,
            }),
        }),
        showEventAttendees: builder.query({
            query: (id) => ({
                url: `event/attendees/${id}`,
                method: 'GET',
            }),
        }),
        removeForm: builder.mutation({
            query: (event_id) => ({
                url: `event/${event_id}/form`,
                method: 'DELETE',
            }),
            invalidatesTags: ['event'],
        }),
    }),
});

export const {
    useCreateMutation,
    useShowQuery,
    useUpdateDetailsMutation,
    useUpdateTagsMutation,
    useUpdateAgeGroupsMutation,
    useShowEventAttendeesQuery,
    useRemoveFormMutation,
} = events;
