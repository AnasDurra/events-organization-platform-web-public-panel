import { apiSlice } from '../../api/apiSlice';

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        newEmployee: builder.mutation({
            query: (body) => {
                return {
                    url: `employee`,
                    method: 'POST',
                    body: body,
                };
            },
            invalidatesTags: ['one-org'],
        }),

        editEmployee: builder.mutation({
            query: (data) => {
                return {
                    url: `employee/${data?.employee?.id}`,
                    method: 'PATCH',
                    body: { ...data, employee: undefined },
                };
            },
            invalidatesTags: ['one-org'],
        }),

        getPermissions: builder.query({
            query: () => `/permissions`,
        }),
    }),
});

export const { useNewEmployeeMutation, useEditEmployeeMutation ,useGetPermissionsQuery} = employeeSlice;
