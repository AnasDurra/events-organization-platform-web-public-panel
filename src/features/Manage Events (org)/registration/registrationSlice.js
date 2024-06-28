import { apiSlice } from '../../../api/apiSlice';

export const registrationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAttendeeEventStatus: builder.query({
            query: ({ attendee_id, event_id }) =>
                `attendee/attendee-event-info?event_id=${event_id}&attendee_id=${attendee_id}`,

            providesTags: ['did-fill-form'],
        }),

        attendEvent: builder.mutation({
            query: ({ event_id }) => ({
                url: `/attend-event`,
                method: 'POST',
                body: { event_id },
            }),
            invalidatesTags: ['confirm-attendance', 'attendee-status', 'tickets-balance'],
        }),
    }),
});

export const { useAttendEventMutation, useLazyGetAttendeeEventStatusQuery } = registrationSlice;
