import { apiSlice } from '../../api/apiSlice';

export const ticketingPackagesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => '/payment/packages',
        }),
        getAttendeeBalance: builder.query({
            query: (id) => `/payment/attendee/balance/${id}`,
        }),
        getAttendeeTicketsHistory: builder.query({
            query: (id) => `payment/attendee/${id}/ticketsHistory`,
        }),
        checkout: builder.mutation({
            query: (body) => ({
                url: '/payment/checkout',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {
    useGetPackagesQuery,
    useGetAttendeeBalanceQuery,
    useCheckoutMutation,
    useGetAttendeeTicketsHistoryQuery,
} = ticketingPackagesSlice;
