import { apiSlice } from '../../api/apiSlice';

export const gamificationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPrizes: builder.query({
            query: () => `gamification/prizes`,
        }),
    }),
});

export const { useGetPrizesQuery } = gamificationSlice;
