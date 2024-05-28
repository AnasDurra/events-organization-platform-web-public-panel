import { current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { apiSlice } from '../../api/apiSlice';
import dayjs from 'dayjs';

export const feedsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSoonEvents: builder.query({
            query: ({ page, pageSize }) => `feed/soonEvents?page=${page}&pageSize=${pageSize}`,
        }),
        getEvents: builder.query({
            query: ({ page, pageSize, startDate, endDate, locationId, popularity, search }) => {
                const params = {};

                if (page) {
                    params['page'] = page;
                }
                if (pageSize) {
                    params['pageSize'] = pageSize;
                }
                if (startDate) {
                    try {
                        params['start_date'] = dayjs(startDate).format('YYYY-MM-DD');
                    } catch (error) {
                        console.error('Error formatting start date:', error);
                    }
                }
                if (endDate) {
                    try {
                        params['end_date'] = dayjs(endDate).format('YYYY-MM-DD');
                    } catch (error) {
                        console.error('Error formatting start date:', error);
                    }
                }
                if (locationId) {
                    params['addresses'] = [locationId];
                }
                if (popularity != null) {
                    params['most_popular'] = popularity;
                }
                if (search != null) {
                    params['search'] = search;
                }
                const queryString = new URLSearchParams(params).toString();
                return `feed/events?${queryString}`;
            },
        }),

        getFeaturedEvents: builder.query({
            query: () => `featured-events`,
        }),

        getOrganizationsSummary: builder.query({
            query: ({ page, pageSize }) => `feed/organizations?page=${page}&pageSize=${pageSize}`,
        }),
        getPopularEvents: builder.query({
            query: ({ page, pageSize }) => `feed/popularEvents?page=${page}&pageSize=${pageSize}`,
        }),
        getFollowingEvents: builder.query({
            query: ({ page, pageSize }) => `feed/followedEvents?page=${page}&pageSize=${pageSize}`,
        }),
        getAddresses: builder.query({
            query: () => `address`,
        }),
        getCategories: builder.query({
            query: () => `feed/categories`,
        }),
        getCategoryEvents: builder.query({
            query: ({ page, pageSize, category_id }) =>
                `feed/event/categories?categories=${category_id}&pageSize=${pageSize}&page=${page}`,
        }),

        querySubmissions: builder.mutation({
            query: (data) => ({
                url: '/forms/query',
                method: 'POST',
                body: data,
            }),
        }),

        updateForm: builder.mutation({
            query: ({ fields, form_id }) => ({
                url: `/forms/${form_id}`,
                method: 'PATCH',
                body: fields,
            }),
            invalidatesTags: ['form'],
        }),
        removeGroup: builder.mutation({
            query: ({ group_id, form_id }) => ({
                url: `/forms/deleteGroup/${group_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ group_id, form_id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', form_id, (draft) => {
                        if (draft && draft.result && Array.isArray(draft.result.groups)) {
                            draft.result.groups = draft.result.groups.filter((grp) => grp.id !== group_id);
                            draft.result.groups.forEach((group, index) => (group.position = index));
                        }

                        console.log('draft: ', current(draft));
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetSoonEventsQuery,
    useGetEventsQuery,
    useLazyGetEventsQuery,
    useGetOrganizationsSummaryQuery,
    useLazyGetOrganizationsSummaryQuery,
    useGetPopularEventsQuery,
    useLazyGetPopularEventsQuery,
    useLazyGetFollowingEventsQuery,
    useGetFollowingEventsQuery,
    useGetAddressesQuery,
    useGetFeaturedEventsQuery,
    useGetCategoriesQuery,
    useGetCategoryEventsQuery,
    useLazyGetCategoryEventsQuery
} = feedsSlice;
