import { apiSlice } from '../apiSlice';

export const reports = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        abuseType: builder.query({
            query: () => ({
                url: 'abuse-type',
                method: 'GET',
            }),
        }),
        isMessageReported: builder.query({
            query: (id) => ({
                url: `organization-report/is-reported/${id}`,
                method: 'GET',
            }),
        }),
        reportToOrg: builder.mutation({
            query: (body) => ({
                url: 'organization-report',
                method: 'POST',
                body: body,
            }),
        }),
        orgReports: builder.query({
            query: ({ page, pageSize }) => ({
                url: `organization-report?page=${page}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['reports'],
        }),
        resolveMessageReport: builder.mutation({
            query: (report_id) => ({
                url: `organization-report/resolve-message/${report_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['reports'],
        }),
        ignoreReport: builder.mutation({
            query: (report_id) => ({
                url: `organization-report/ignore/${report_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['reports'],
        }),
        resolveProblem: builder.mutation({
            query: (report_id) => ({
                url: `organization-report/resolve/${report_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['reports'],
        }),
    }),
});

export const {
    useAbuseTypeQuery,
    useLazyIsMessageReportedQuery,
    useReportToOrgMutation,
    useOrgReportsQuery,
    useResolveMessageReportMutation,
    useIgnoreReportMutation,
    useResolveProblemMutation,
} = reports;
