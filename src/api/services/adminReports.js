import { apiSlice } from '../apiSlice';

export const adminReports = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        platformProblems: builder.query({
            query: () => ({
                url: 'platform-problem',
                method: 'GET',
            }),
        }),
        isEventReported: builder.query({
            query: (id) => ({
                url: `admin-report/is-reported/${id}`,
                method: 'GET',
            }),
        }),
        reportAdmin: builder.mutation({
            query: (body) => ({
                url: 'admin-report',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { usePlatformProblemsQuery, useLazyIsEventReportedQuery, useReportAdminMutation } = adminReports;
