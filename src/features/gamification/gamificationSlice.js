import { apiSlice } from '../../api/apiSlice';
import { getLoggedInUserV2 } from '../../api/services/auth';

export const gamificationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAttendeeRPs: builder.query({
            query: (attendee_id) => `gamification/attendee/${attendee_id}/redeemable-points`,
            providesTags: ['rp-balance'],
        }),

        getAttendeeBadges: builder.query({
            query: (attendee_id) => `gamification/attendee/${attendee_id}/badges`,
        }),

        getAttendeePrizeHistory: builder.query({
            query: (attendee_id) => `gamification/attendee/${attendee_id}/prizes`,
            providesTags: ['rp-balance'],
        }),

        getPrizes: builder.query({
            query: () => `gamification/prizes`,
        }),

        getBadges: builder.query({
            query: () => `gamification/rewards/badges`,
        }),

        redeemRPs: builder.mutation({
            query(body) {
                return {
                    url: `gamification/prizes/redeem`,
                    method: 'POST',
                    body: body,
                };
            },
            invalidatesTags: ['tickets-balance', 'rp-balance'],
        }),
    }),
});

export const {
    useGetAttendeeRPsQuery,
    useGetPrizesQuery,
    useGetBadgesQuery,
    useGetAttendeeBadgesQuery,
    useGetAttendeePrizeHistoryQuery,
    useRedeemRPsMutation,
} = gamificationSlice;
