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
            query: (id) => ({
                url: `event/show/${id}`,
                method: "GET",
            }),
        }),
        updateDetails: builder.mutation({
            query: ({ id, body }) => ({
                url: `event/update/${id}`,
                method: "POST",
                body: body,
            }),
        }),
        updateTags: builder.mutation({
            query: ({ id, body }) => ({
                url: `event/update-tags/${id}`,
                method: "POST",
                body: body,
            }),
        }),
        updateAgeGroups: builder.mutation({
            query: ({ id, body }) => ({
                url: `event/update-age-groups/${id}`,
                method: "POST",
                body: body,
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
