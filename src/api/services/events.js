import { apiSlice } from "../../../src/api/apiSlice";
import Cookies from "js-cookie";

export const events = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: "event/create",
                method: "POST",
                body: data,
            }),
        }),

        show: builder.query({
            query: () => ({
                url: "event/show/13",
                method: "GET",
            }),
        }),
        updateDetails: builder.mutation({
            query: (data) => ({
                url: "event/update/13",
                method: "POST",
                body: data,
            }),
        }),
        updateTags: builder.mutation({
            query: (data) => ({
                url: "event/update-tags/13",
                method: "POST",
                body: data,
            }),
        }),
        updateAgeGroups: builder.mutation({
            query: (data) => ({
                url: "event/update-age-groups/13",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateMutation,
    useShowQuery,
    useUpdateDetailsMutation,
    useUpdateTagsMutation,
    useUpdateAgeGroupsMutation,
} = events;
