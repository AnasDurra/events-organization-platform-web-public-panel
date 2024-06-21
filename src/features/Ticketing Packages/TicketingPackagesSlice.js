import { apiSlice } from '../../api/apiSlice';

export const ticketingPackagesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => '/payment/packages',
        }),
        getAttendeeBalance: builder.query({
            query: (id) => `/payment/attendee/balance/${id}`,
            providesTags: ['tickets-balance'],
        }),
        getAttendeeTicketsHistory: builder.query({
            query: (id) => `payment/attendee/${id}/ticketsHistory`,
        }),

        getOrgBalance: builder.query({
            query: (id) => `/payment/organization/balance/${id}`,
            providesTags: ['org-tickets-balance'],
        }),

        getOrgWithdraws: builder.query({
            query: (orgID) => `payment/organization/${orgID}/withdraw/requests`,
            providesTags: ['org-withdraws'],
        }),

        getOrgTicketsHistory: builder.query({
            query: (orgID) => `payment/organization/${orgID}/ticketsHistory`,
        }),

        withdraw: builder.mutation({
            query: (body) => ({
                url: '/payment/organization/withdraw',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['org-withdraws', 'org-tickets-balance'],
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
    useGetOrgBalanceQuery,
    useCheckoutMutation,
    useGetAttendeeTicketsHistoryQuery,
    useWithdrawMutation,
    useGetOrgTicketsHistoryQuery,
    useGetOrgWithdrawsQuery,
} = ticketingPackagesSlice;
