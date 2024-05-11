import { apiSlice } from '../../../api/apiSlice';

export const registrationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDidAttendeeFillForm: builder.query({
            query: ({ attendee_id, event_id }) =>
                `attendee/filled-event-form?event_id=${event_id}&attendee_id=${attendee_id}`,

            providesTags:['did-fill-form']
        }),

        attendEvent: builder.mutation({
            query: ({ event_id }) => ({
                url: `/attend-event`,
                method: 'POST',
                body: { event_id },
            }),
        }),
    }),
});

export const { useAttendEventMutation,useGetDidAttendeeFillFormQuery } = registrationSlice;
