import { apiSlice } from '../apiSlice';

export const reports = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        abuseType: builder.query({
            query: () => ({
                url: 'abuse-type',
                method: 'GET',
            }),
        }),
    }),
});

export const { useAbuseTypeQuery } = reports;
